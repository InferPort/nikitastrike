import React from 'react';

export const TagList: React.FC<{ tags: string[] }> = ({ tags }) => {
    if (!tags || tags.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-1.5 mt-4">
            {tags.map((tag, index) => (
                <span
                    key={index}
                    className="px-2 py-0.5 bg-primary-subtle text-ink-dim text-[10px] tracking-wider font-bold rounded-md border border-primary/10"
                >
                    {tag}
                </span>
            ))}
        </div>
    );
};
