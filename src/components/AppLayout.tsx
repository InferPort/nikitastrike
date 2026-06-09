import React from 'react';
import { HeaderNav } from './HeaderNav';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen bg-surface text-light-text">
            <HeaderNav />
            <main className="pt-16">
                {children}
            </main>
            <footer className="py-16 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-4 text-ink-muted">
                <div className="font-mono text-[10px] tracking-widest">
                    © {new Date().getFullYear()} nikitastrike
                </div>
                <span className="hidden md:inline text-line">·</span>
                <div className="font-mono text-[10px] tracking-widest text-ink-muted/70">
                    Systems Architect / Reverse Engineering
                </div>
            </footer>
        </div>
    );
};
