import React from 'react';

export const TagList: React.FC<{ tags: string[] }> = ({ tags }) => {
    if (!tags || tags.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
                <span
                    key={index}
                    className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] uppercase tracking-wider font-bold rounded"
                >
                    {tag}
                </span>
            ))}
        </div>
    );
};
