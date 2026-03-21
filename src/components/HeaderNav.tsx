import React from 'react';
import { Terminal } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

export const HeaderNav: React.FC = () => {
    const { t } = useTranslation();
    const { pathname } = useLocation();

    const isHome = pathname === '/';

    const scrollIntoView = (id: string) => {
        if (isHome) {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-charcoal">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <Terminal className="text-primary" size={24} />
                    <span className="font-bold tracking-tight text-lg uppercase">nikitastrike</span>
                </Link>
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase">
                    <Link
                        className="hover:text-primary transition-colors"
                        to="/"
                        onClick={() => scrollIntoView('home')}
                    >
                        {t('nav.home')}
                    </Link>
                    <Link
                        className="hover:text-primary transition-colors"
                        to={isHome ? "#about" : "/#about"}
                        onClick={() => scrollIntoView('about')}
                    >
                        {t('nav.about')}
                    </Link>
                    <Link
                        className="hover:text-primary transition-colors"
                        to={isHome ? "#experience" : "/#experience"}
                        onClick={() => scrollIntoView('experience')}
                    >
                        {t('nav.experience')}
                    </Link>
                    <Link
                        className="hover:text-primary transition-colors"
                        to={isHome ? "#professional-projects" : "/#professional-projects"}
                        onClick={() => scrollIntoView('professional-projects')}
                    >
                        {t('nav.professional')}
                    </Link>
                    <Link
                        className="hover:text-primary transition-colors"
                        to={isHome ? "#oss-tools" : "/#oss-tools"}
                        onClick={() => scrollIntoView('oss-tools')}
                    >
                        {t('nav.oss')}
                    </Link>


                    <Link
                        className="hover:text-primary transition-colors"
                        to={isHome ? "#contact" : "/#contact"}
                        onClick={() => scrollIntoView('contact')}
                    >
                        {t('nav.contact')}
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <LanguageToggle />
                    <a
                        className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-all"
                        href="mailto:me@nikitastrike.co"
                    >
                        {t('nav.cta')}
                    </a>
                </div>
            </div>
        </header>
    );
};

