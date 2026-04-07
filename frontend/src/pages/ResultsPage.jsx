import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from '../api/axios';

import ScoreCircle from '../components/ScoreCircle';
import KeywordBadges from '../components/KeywordBadges';
import SectionScoreCard from '../components/SectionScoreCard';
import FeedbackAccordion from '../components/FeedbackAccordion';
import RewriteButton from '../components/RewriteButton';

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

    const matchScore = resultData?.match_score || 0;
    const atsScore = resultData?.ats_score || 0;
    const missingKeywords = resultData?.missing_keywords || [];
    const foundKeywords = resultData?.found_keywords || [];
    const sectionScores = resultData?.section_scores || {};
    const feedbackData = resultData?.feedback || {};
    const weakBullets = resultData?.weak_bullets || [];

    return (
        <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">

            {/* 1. Header Section */}
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-dark-900 dark:text-white">Your AI Resume Results</h1>
                <p className="text-dark-400 text-lg">Detailed analysis and actionable steps to improve your chances.</p>
            </div>

            {/* 2. Top Scores Row using <ScoreCircle /> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-dark-800 rounded-3xl p-8 border border-dark-200 dark:border-dark-700 flex flex-col items-center justify-center shadow-sm">
                    <ScoreCircle score={matchScore} label="Job Match Score" />
                    <p className="text-sm text-dark-400 mt-4 text-center max-w-xs">
                        How well your resume aligns with the specific job description provided.
                    </p>
                </div>

                <div className="bg-white dark:bg-dark-800 rounded-3xl p-8 border border-dark-200 dark:border-dark-700 flex flex-col items-center justify-center shadow-sm">
                    <ScoreCircle score={atsScore} label="ATS Compatibility" />
                    <p className="text-sm text-dark-400 mt-4 text-center max-w-xs">
                        How easily Applicant Tracking Systems can read and parse your formatting.
                    </p>
                </div>
            </div>

            {/* 3. Keywords Section using <KeywordBadges /> */}
            <KeywordBadges found={foundKeywords} missing={missingKeywords} />

            {/* 4. Section Scores Grid using <SectionScoreCard /> */}
            <div>
                <h3 className="text-2xl font-bold mb-6 text-dark-800 dark:text-white">Section Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <SectionScoreCard label="Summary" score={sectionScores.summary || 0} />
                    <SectionScoreCard label="Skills" score={sectionScores.skills || 0} />
                    <SectionScoreCard label="Experience" score={sectionScores.experience || 0} />
                    <SectionScoreCard label="Education" score={sectionScores.education || 0} />
                </div>
            </div>

            {/* 5. Detailed Feedback Accordion using <FeedbackAccordion /> */}
            <div>
                <h3 className="text-2xl font-bold mb-6 text-dark-800 dark:text-white">Detailed Feedback</h3>
                <FeedbackAccordion feedbackData={feedbackData} />
            </div>

            {/* 6. Weak Bullets / Rewrite Section using <RewriteButton /> */}
            {weakBullets && weakBullets.length > 0 && (
                <div>
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-dark-800 dark:text-white">Bullet Point Rewriter</h3>
                        <p className="text-dark-500">The AI identified these weak bullet points. Use the magic wand to rewrite them!</p>
                    </div>
                    <div className="space-y-6">
                        {weakBullets.map((bulletObj, index) => (
                            <RewriteButton
                                key={index}
                                // Some backends might return strings, some objects. This handles both!
                                text={typeof bulletObj === 'string' ? bulletObj : bulletObj.original}
                                context={resultData?.job_description || "resume bullet point"}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Footer Actions */}
            <div className="pt-8 mt-12 mb-8 border-t border-dark-200 dark:border-dark-700 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/dashboard" className="btn-primary w-full sm:w-auto text-center px-10 py-3 text-lg shadow-glow">
                    Back to Dashboard
                </Link>
                <Link to="/analyze" className="font-bold text-dark-500 hover:text-primary-500 transition px-10 py-3">
                    Analyze Another Resume
                </Link>
            </div>

        </div>
    );
}
