import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function KeywordBadges({ found = [], missing = [] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Found Keywords Section */}
            <div className="bg-green-50 dark:bg-green-900/10 rounded-3xl p-6 border border-green-100 dark:border-green-800/30">
                <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="text-green-500 w-6 h-6" />
                    <h3 className="text-xl font-bold text-green-700 dark:text-green-500">Found Keywords</h3>
                </div>

                {/* Check if we have keywords, if yes map them, if no show message */}
                {found.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {found.map((keyword, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-green-100 dark:bg-green-800/40 text-green-700 dark:text-green-300 text-sm font-medium rounded-full cursor-default transition hover:scale-105"
                            >
                                {keyword}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-green-600 dark:text-green-400 text-sm opacity-80">
                        No essential keywords found from the job description.
                    </p>
                )}
            </div>

            {/* Missing Keywords Section */}
            <div className="bg-red-50 dark:bg-red-900/10 rounded-3xl p-6 border border-red-100 dark:border-red-800/30">
                <div className="flex items-center gap-2 mb-4">
                    <XCircle className="text-red-500 w-6 h-6" />
                    <h3 className="text-xl font-bold text-red-700 dark:text-red-500">Missing Keywords</h3>
                </div>

                {missing.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {missing.map((keyword, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-red-100 dark:bg-red-800/40 text-red-700 dark:text-red-300 text-sm font-medium rounded-full cursor-default transition hover:scale-105"
                            >
                                {keyword}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-red-600 dark:text-red-400 text-sm opacity-80">
                        Great job! You have included all major keywords.
                    </p>
                )}
            </div>

        </div>
    );
}

