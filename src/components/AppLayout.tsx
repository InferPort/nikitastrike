import React from 'react';
import { HeaderNav } from './HeaderNav';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-bone">
            <HeaderNav />
            <main className="pt-16">
                {children}
            </main>
            <footer className="py-12 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center text-slate-600">
                <div className="font-mono text-[10px] uppercase tracking-widest">
                    © {new Date().getFullYear()}
                </div>
            </footer>
        </div>
    );
};
