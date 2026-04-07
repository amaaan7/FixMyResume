import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { FileText, Clock, Plus, BarChart2 } from 'lucide-react';


import ScoreChart from '../components/ScoreChart';

export default function DashboardPage() {
    const [analyses, setAnalyses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the user's past data when the page loads
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch the list of all past analyses from Django for the logged-in user
                const response = await api.get('/api/analyzer/analyses/');
                setAnalyses(response.data);
            } catch (err) {
                console.error("Dashboard error:", err);
                setError("Failed to load your dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center mt-20 text-red-500 font-bold">{error}</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-12">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2 text-dark-900 dark:text-white">My Dashboard</h1>
                    <p className="text-dark-500 dark:text-dark-400">Track and review your past resume scores.</p>
                </div>
                {/* 2. New Analysis CTA Button */}
                <Link to="/analyze" className="btn-primary flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    New Analysis
                </Link>
            </div>

            {/* Empty State vs Full State Dashboard */}
            {analyses.length === 0 ? (
                <div className="bg-dark-50 dark:bg-dark-800 rounded-2xl p-12 text-center border border-dark-200/80 dark:border-dark-700 shadow-md">
                    <div className="w-20 h-20 bg-dark-100 dark:bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-10 h-10 text-dark-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-dark-800 dark:text-white">No resumes analyzed yet!</h2>
                    <p className="text-dark-500 dark:text-dark-400 max-w-md mx-auto mb-8">
                        Upload your first resume and job description to get AI-powered insights and an ATS match score.
                    </p>
                    <Link to="/analyze" className="btn-primary inline-flex">
                        Start First Analysis
                    </Link>
                </div>
            ) : (
                <div className="space-y-12">

                    {/* 3. Render our ScoreChart Component and feed it the huge array of backend data! */}
                    <ScoreChart data={analyses} />

                    {/* 4. Render the Recent History Grid */}
                    <div>
                        <h2 className="text-xl font-bold mb-6 text-dark-800 dark:text-white">Recent Analyses</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Loop through every past analysis and make a card for it */}
                            {analyses.map((item) => (
                                <Link
                                    key={item.id}
                                    to={`/results/${item.id}`} // Takes them to the Results Page we just built
                                    className="bg-dark-50 dark:bg-dark-800 rounded-2xl p-6 border border-dark-300/60 dark:border-dark-700 shadow-sm hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-glow transition-all group"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-primary-50 dark:bg-primary-500/10 rounded-xl text-primary-600 dark:text-primary-400">
                                            <BarChart2 className="w-6 h-6" />
                                        </div>
                                        {/* Dynamic Text Color based on score (Red/Amber/Green) */}
                                        <span className={`text-2xl font-bold ${item.match_score > 75 ? 'text-green-500' : (item.match_score < 50 ? 'text-red-500' : 'text-amber-500')}`}>
                                            {item.match_score}%
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-lg mb-2 truncate text-dark-800 dark:text-white">
                                        Analysis #{item.id}
                                    </h3>

                                    <div className="flex items-center gap-2 text-sm text-dark-500 dark:text-dark-400 mt-4 pt-4 border-t border-dark-100 dark:border-dark-700">
                                        <Clock className="w-4 h-4" />
                                        <span>{new Date(item.created_at).toLocaleDateString()}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
