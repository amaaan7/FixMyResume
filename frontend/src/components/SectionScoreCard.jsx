import React, { useState, useEffect } from 'react';

export default function SectionScoreCard({ label, score = 0 }) {
    const [animatedScore, setAnimatedScore] = useState(0);

    // 1. Simple animation when the component loads
    useEffect(() => {
        // We use a small delay so the animation triggers smoothly after the page renders
        const timer = setTimeout(() => {
            setAnimatedScore(score);
        }, 100);

        return () => clearTimeout(timer);
    }, [score]);

    // 2. Set colors based on performance
    let colorClass = "text-green-500";
    let bgProgressClass = "bg-green-500";

    if (score < 50) {
        colorClass = "text-red-500";
        bgProgressClass = "bg-red-500";
    } else if (score < 75) {
        colorClass = "text-amber-500";
        bgProgressClass = "bg-amber-500";
    }

    return (
        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-dark-200 dark:border-dark-700 shadow-sm hover:shadow-md transition">

            <div className="flex justify-between items-end mb-4">
                <h4 className="text-lg font-bold text-dark-800 dark:text-white capitalize">
                    {label}
                </h4>

                {/* The Score Text */}
                <div className={`text-2xl font-black ${colorClass}`}>
                    {score}<span className="text-sm font-medium text-dark-400">/100</span>
                </div>
            </div>

            {/* 3. The Progress Bar Parent Container (The Background Track) */}
            <div className="w-full h-3 bg-dark-100 dark:bg-dark-700 rounded-full overflow-hidden">

                {/* 4. The Progress Bar "Fill" - width is animated dynamically */}
                <div
                    className={`h-full ${bgProgressClass} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${animatedScore}%` }}
                ></div>

            </div>
        </div>
    );
}

