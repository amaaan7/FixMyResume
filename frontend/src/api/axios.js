import axios from 'axios';

// 1. Create a custom Axios instance
const api = axios.create({
    // This is the URL of your Django backend. 
    // Now you don't have to type it out for every single request!
    baseURL: 'http://127.0.0.1:8000',
    // We can also set default headers here
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. Request Interceptor: Runs BEFORE every request is sent
api.interceptors.request.use(
    (config) => {
        // Look for the access token in local storage
        const token = localStorage.getItem('accessToken');
        
        // If we found a token, attach it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Response Interceptor: Runs AFTER we get a response, but BEFORE conventional .then() or .catch()
api.interceptors.response.use(
    (response) => {
        // If the request was successful, just return the response
        return response;
    },
    (error) => {
        // If the backend says "401 Unauthorized" (meaning the token is missing, expired, or invalid)
        if (error.response && error.response.status === 401) {
            console.log('Token expired or invalid. Please log in again.');
            // Usually, we'd trigger a logout here. We'll wire this up properly 
            // when we build the AuthContext.
            
            // Optional: If you wanted to forcefully redirect right now, you could do:
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
