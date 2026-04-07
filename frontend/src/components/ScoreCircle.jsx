import React, { useState, useEffect } from 'react';

export default function ScoreCircle({ score = 0, label = "Score" }) {
    const [animatedScore, setAnimatedScore] = useState(0);

    // 1. Visually animate the score counting up from 0
    useEffect(() => {
        let start = 0;
        const duration = 1500; // Total animation time (1.5 seconds)
        const increment = duration / (score || 1); // Fast enough to reach score in duration

        const timer = setInterval(() => {
            start += 1;
            if (start >= score) {
                setAnimatedScore(score);
                clearInterval(timer);
            } else {
                setAnimatedScore(start);
            }
        }, increment);

        // Cleanup interval when component unmounts
        return () => clearInterval(timer);
    }, [score]);

    // 2. Decide the colors based on score performance
    let colorClass = "text-green-500 border-green-500";
    let strokeClass = "stroke-green-500";

    if (score < 50) {
        colorClass = "text-red-500 border-red-500";
        strokeClass = "stroke-red-500";
    } else if (score < 75) {
        colorClass = "text-amber-500 border-amber-500";
        strokeClass = "stroke-amber-500";
    }

    // 3. Math to figure out how much of the SVG circle "progress bar" to fill
    const size = 160;                 // Width and Height in pixels
    const strokeWidth = 10;           // Thickness of the ring
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    // We offset the outline by however missing the score is from 100
    const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center">

            {/* The Circle Parent Container */}
            <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>

                {/* 4. We rotate the SVG -90deg so the progress starts at the top (12 o'clock) */}
                <svg className="absolute top-0 left-0 transform -rotate-90" width={size} height={size}>

                    {/* Background Ring (Faded/Empty) */}
                    <circle
                        className="stroke-dark-100 dark:stroke-dark-700"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                    />

                    {/* Animated Progress Ring (Colored) */}
                    <circle
                        className={`${strokeClass} transition-all duration-[10ms] ease-out`}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round" // Gives the bar rounded edges
                        fill="transparent"
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                    />
                </svg>

                {/* The Floating Numbers Inside the Ring */}
                <div className={`absolute flex flex-col items-center justify-center ${colorClass} w-full h-full`}>
                    <span className="text-4xl font-black">{animatedScore}</span>
                    <span className="text-xs font-semibold text-dark-400 dark:text-dark-500">/ 100</span>
                </div>
            </div>

            {/* Label Underneath the Circle */}
            <div className="mt-4 text-center text-lg font-semibold text-dark-700 dark:text-dark-300">
                {label}
            </div>

        </div>
    );
}

