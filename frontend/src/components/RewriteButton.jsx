import React, { useState } from 'react';
import { Sparkles, Copy, Check, AlertCircle } from 'lucide-react';
import api from '../api/axios';

export default function RewriteButton({ text, context = "resume bullet point" }) {
    const [rewrittenText, setRewrittenText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    const handleRewrite = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await api.post('/api/analyzer/rewrite/', {
                original_text: text,
                job_description: context
            });

            setRewrittenText(response.data.rewritten || "Could not rewrite.");
        } catch (err) {
            console.error("Rewrite error:", err);
            setError("Failed to rewrite text. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    const handleCopy = () => {
        if (rewrittenText) {
            navigator.clipboard.writeText(rewrittenText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="bg-dark-50 dark:bg-dark-800/50 rounded-xl p-5 border border-dark-200 dark:border-dark-700">

            {/* The Original Weak Text */}
            <div className="text-dark-700 dark:text-dark-300 italic mb-4 border-l-4 border-dark-300 dark:border-dark-600 pl-4 py-1">
                "{text}"
            </div>

            {/* Action Area (Shows button if not rewritten yet) */}
            {!rewrittenText && (
                <div className="flex items-center justify-between">
                    {/* Show error if the API fails */}
                    {error && (
                        <div className="flex items-center gap-2 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    {/* The "Magic Wand" Button */}
                    <button
                        onClick={handleRewrite}
                        disabled={isLoading}
                        className="ml-auto flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-medium rounded-lg hover:from-primary-700 hover:to-indigo-700 disabled:opacity-50 transition"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Rewriting...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" />
                                Rewrite with AI
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* Result Area (Shows only after a successful AI rewrite) */}
            {rewrittenText && (
                <div className="mt-4 pt-4 border-t border-dark-200 dark:border-dark-700 animate-fade-in">
                    <h5 className="text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2">
                        AI Suggestion
                    </h5>

                    <div className="bg-white dark:bg-dark-900 rounded-lg p-4 text-dark-800 dark:text-dark-100 flex items-start gap-4 shadow-inner">
                        <div className="flex-1">
                            {rewrittenText}
                        </div>

                        {/* Copy to Clipboard Button */}
                        <button
                            onClick={handleCopy}
                            className="p-2 text-dark-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg transition shrink-0"
                            title="Copy to clipboard"
                        >
                            {/* Toggle icon based on 'copied' state */}
                            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

