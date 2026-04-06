import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


// 1. Import our AuthContext and Navbar
import { AuthContext, AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
// We will update Navbar in the next step

// 2. Import Pages (We only have Landing right now)
import Landing from './pages/Landing';
import LoginPage from './pages/LoginPage';

// --- Temporary Placeholders ---
// To prevent the app from crashing while we build, these are temporary dummy pages.
// We will replace these with real imports in the upcoming steps!
const AnalyzePage = () => <div className="p-10 text-center text-xl mt-10">Analyze Page (Coming Soon)</div>;
const ResultsPage = () => <div className="p-10 text-center text-xl mt-10">Results Page (Coming Soon)</div>;
const DashboardPage = () => <div className="p-10 text-center text-xl mt-10">Dashboard (Coming Soon)</div>;
const RegisterPage = () => <div className="p-10 text-center text-xl mt-10">Register (Coming Soon)</div>;

// --- 3. Protected Route Wrapper ---
// This acts as a security guard for routes.
const ProtectedRoute = ({ children }) => {
    // Grab the auth state from our global context
    const { isAuthenticated, loading } = useContext(AuthContext);

    // If context is still booting up/checking local storage, show a loader
    if (loading) return <div className="text-center mt-20">Loading Application...</div>;

    // If the user is NOT logged in, forcibly redirect them to the /login page
    if (!isAuthenticated) return <Navigate to="/login" />;

    // If they ARE logged in, render the protected component!
    return children;
};

// --- Main App Component ---
function App() {
    return (
        // Wrap everything in AuthProvider so the whole app knows who is logged in!
        <AuthProvider>
            {/* Global styling for the overall app wrapper */}
            <div className="min-h-screen bg-white dark:bg-dark-900 text-dark-900 dark:text-dark-100 font-sans selection:bg-primary-500 selection:text-white pb-10 transition-colors duration-300">

                {/* Navbar is outside of <Routes> so it exists on EVERY page */}
                <Navbar />

                {/* 4. Define all our URL paths */}
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Protected routes */}
                    <Route path="/analyze" element={<ProtectedRoute><AnalyzePage /></ProtectedRoute>} />
                    <Route path="/results" element={<ProtectedRoute><ResultsPage /></ProtectedRoute>} />
                    <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
