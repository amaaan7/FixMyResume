import React from 'react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';

export default function ScoreChart({ data = [] }) {
    // If we have no data, show a placeholder box
    if (!data || data.length === 0) {
        return (
            <div className="bg-white dark:bg-dark-800 rounded-3xl p-8 border border-dark-200 dark:border-dark-700 h-64 flex items-center justify-center text-dark-400 font-medium">
                Not enough data to display chart.
            </div>
        );
    }

    // 1. Data Formatting: Reserve array to show chronological order, format ugly dates into "Apr 7"
    const chartData = [...data].reverse().map(item => ({
        date: new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        score: item.match_score,
        id: item.id
    }));

    // 2. Custom Tooltip so the hover effect matches our Tailwand dark/light themes
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-dark-800 p-4 rounded-xl shadow-lg border border-dark-200 dark:border-dark-700 pointer-events-none">
                    <p className="text-dark-500 font-medium mb-1">{label}</p>
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {payload[0].value}<span className="text-sm text-dark-400 font-normal">/100</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white dark:bg-dark-800 rounded-3xl p-6 md:p-8 border border-dark-200 dark:border-dark-700 shadow-sm relative overflow-hidden">

            {/* Background Glow Effect using absolute positioning */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 dark:bg-primary-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="mb-8 relative z-10">
                <h3 className="text-xl font-bold text-dark-800 dark:text-white">Score History</h3>
                <p className="text-dark-500 text-sm">Your ATS match score progress over time</p>
            </div>

            {/* 3. The Rechart Component */}
            <div className="h-72 w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <defs>
                            {/* SVG Gradient for the area fill */}
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.15} />

                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
                            dy={10}
                        />
                        <YAxis
                            domain={[0, 100]}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
                        />

                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }} />

                        <Area
                            type="monotone"
                            dataKey="score"
                            stroke="#3b82f6"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorScore)"
                            activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6', className: 'animate-pulse' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}

