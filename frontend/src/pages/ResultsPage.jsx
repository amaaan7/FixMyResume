import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from '../api/axios'; // Use our authenticated instance

export default function ResultsPage() {
    const { id } = useParams();

    const [resultData, setResultData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await api.get(`/api/analyzer/analyses/${id}/`);
                setResultData(response.data);
            } catch (err) {
                console.error('Error fetching results:', err);
                setError('Could not load your resume results. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [id]);


    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                <h2 className="mt-6 text-xl font-medium text-dark-500 dark:text-dark-300 animate-pulse">
                    Retrieving AI Analysis...
                </h2>
            </div>
        );
    }

    // --- Error UI ---
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-6 rounded-2xl max-w-lg text-center">
                    <h2 className="text-2xl font-bold mb-2">Oops!</h2>
                    <p>{error}</p>
                    <Link to="/analyze" className="mt-4 inline-block px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition" >
                        Try Analyzing Again
                    </Link>
                </div>
            </div>
        );
    }

    // --- Success UI (The Results) ---
    const score = resultData?.match_score || 0;
    
    // In our backend, feedback is returned as a JSON object of sections, e.g. {"summary": "...", "experience": "..."}
    // For now, let's just make it a readable string to avoid React crashing while trying to render an object
    const feedbackData = resultData?.feedback || {};
    const feedback = typeof feedbackData === 'string' 
        ? feedbackData 
        : Object.entries(feedbackData).map(([section, text]) => `${section.toUpperCase()}:\n${text}`).join('\n\n') || "No feedback available";

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">

            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Your Resume Analysis</h1>
                <p className="text-dark-400">Review your AI-generated feedback below</p>
            </div>

            {/* Score Card Section */}
            <div className="bg-White dark:bg-dark-800 rounded-3xl p-8 shadow-sm border border-dark-200 dark:border-dark-700 flex flex-col md:flex-row items-center gap-8 mb-8">

                {/* Circular Score Indicator Placeholder */}
                <div className="relative w-40 h-40 flex items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/20 border-8 border-primary-500 text-primary-600 dark:text-primary-400">
                    <span className="text-5xl font-bold">{score}</span>
                    <span className="absolute bottom-4 text-sm font-medium">/ 100</span>
                </div>

                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">ATS Compatibility Score</h2>
                    <p className="text-dark-500 dark:text-dark-300 leading-relaxed mb-4">
                        This score reflects how well your resume is optimized for Applicant Tracking Systems and readability based on industry standards.
                    </p>
                </div>
            </div>

            {/* Feedback Content Section */}
            <div className="bg-white dark:bg-dark-800 rounded-3xl p-8 shadow-sm border border-dark-200 dark:border-dark-700">
                <h3 className="text-xl font-bold mb-6 text-primary-600 dark:text-primary-400">Detailed Feedback</h3>

                {/* Preformatted text to preserve newlines from the AI backend */}
                <div className="prose dark:prose-invert max-w-none text-dark-600 dark:text-dark-300 whitespace-pre-wrap leading-loose">
                    {feedback}
                </div>
            </div>

            <div className="mt-8 text-center">
                <Link to="/analyze" className="text-primary-500 hover:text-primary-600 font-medium transition">
                    ← Analyze Another Resume
                </Link>
            </div>
        </div>
    );
}