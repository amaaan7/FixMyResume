import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FeedbackAccordion({ feedbackData = {} }) {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (sectionName) => {
        setOpenSection(openSection === sectionName ? null : sectionName);
    };

    const isString = typeof feedbackData === 'string';
    const sections = isString
        ? [['General Feedback', feedbackData]]
        : Object.entries(feedbackData);

    if (sections.length === 0) {
        return <p className="text-dark-500">No feedback available.</p>;
    }

    return (
        <div className="space-y-4">

            {sections.map(([sectionName, feedbackText], index) => {

                const isOpen = openSection === sectionName || (isString && openSection !== false);

                return (
                    <div
                        key={index}
                        className="bg-white dark:bg-dark-800 rounded-2xl border border-dark-200 dark:border-dark-700 overflow-hidden shadow-sm"
                    >
                        {/* --- THE BUTTON HEADER --- */}
                        <button
                            onClick={() => toggleSection(sectionName)}
                            className="w-full px-6 py-4 flex items-center justify-between bg-dark-50 dark:bg-dark-800 hover:bg-dark-100 dark:hover:bg-dark-700 transition"
                        >
                            <h4 className="text-lg font-bold text-dark-800 dark:text-white capitalize">
                                {/* Replace underscores with spaces just in case (e.g., job_experience -> job experience) */}
                                {sectionName.replace(/_/g, ' ')}
                            </h4>

                            {/* Toggle Icons from Lucide */}
                            <div className="text-dark-400">
                                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </div>
                        </button>

                        <div
                            className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] py-6 opacity-100 border-t border-dark-100 dark:border-dark-700' : 'max-h-0 py-0 opacity-0'
                                }`}
                        >
                            <div className="prose dark:prose-invert max-w-none text-dark-600 dark:text-dark-300 whitespace-pre-wrap leading-relaxed">
                                {feedbackText}
                            </div>
                        </div>
                    </div>
                );
            })}

        </div>
    );
}

