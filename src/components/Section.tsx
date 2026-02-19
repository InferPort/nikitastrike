import React from 'react';
import { SectionProps } from '../types';
import { cn } from '../utils/cn';

export const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className }) => {
    return (
        <section id={id} className={cn("py-32 px-6 max-w-7xl mx-auto border-b border-charcoal", className)}>
            {(title || subtitle) && (
                <div className="mb-16">
                    {title && <h3 className="text-3xl font-bold uppercase tracking-tight mb-2">{title}</h3>}
                    {subtitle && <p className="text-slate-500 text-sm uppercase tracking-widest font-medium">{subtitle}</p>}
                </div>
            )}
            {children}
        </section>
    );
};
