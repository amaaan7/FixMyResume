import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

// 1. Create the Context
// This is like an empty box that will eventually hold our state.
// We export it so other components can "consume" it using useContext().
export const AuthContext = createContext();

// 2. Create the Provider Component
// This component will wrap our entire app (or parts of it) and provide the state to all its children.
export const AuthProvider = ({ children }) => {
    // --- State ---
    // Stores the user details `{ name, email, ... }`
    const [user, setUser] = useState(null);
    // Easy boolean to check if they are logged in anywhere in the app
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // Keeps track if we are currently checking their token during page refresh
    const [loading, setLoading] = useState(true);

    // --- On App Load ---
    // This runs once when the app starts up a fresh reload.
    // It checks if we have a token saved from a previous session.
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
            // We found a token and user! Restore their logged-in state.
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
        
        // We are done checking, tell the app to stop loading
        setLoading(false);
    }, []);

    // --- Login Function ---
    const login = async (email, password) => {
        // We use our custom 'api' instance here!
        const response = await api.post('/api/auth/login/', { email, password });
        
        // The backend returns { user, tokens: { access, refresh }, message }
        const { tokens, user: userData } = response.data;
        
        // Save the tokens and user data securely in the browser
        localStorage.setItem('accessToken', tokens.access);
        localStorage.setItem('refreshToken', tokens.refresh);
        localStorage.setItem('user', JSON.stringify(userData)); // Local storage only stores strings!

        // Update our React state immediately so the UI changes
        setUser(userData);
        setIsAuthenticated(true);
        
        return response; // We return this so the LoginPage can show a success message or redirect
    };

    // --- Register Function ---
    const register = async (name, email, password) => {
        const response = await api.post('/api/auth/register/', { name, email, password });
        
        const { tokens, user: userData } = response.data;
        
        // Auto-login the user immediately after registering
        localStorage.setItem('accessToken', tokens.access);
        localStorage.setItem('refreshToken', tokens.refresh);
        localStorage.setItem('user', JSON.stringify(userData));

        setUser(userData);
        setIsAuthenticated(true);

        return response;
    };

    // --- Logout Function ---
    const logout = () => {
        // 1. Wipe the tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        // 2. Wipe the state
        setUser(null);
        setIsAuthenticated(false);
        
        // 3. Kick them out to the login page
        window.location.href = '/login'; 
    };

    // --- Provide the actual values ---
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
            {/* If we are loading/checking the token on first boot, we can optionally show a spinner instead of `children` */}
            {!loading && children}
        </AuthContext.Provider>
    );
};
