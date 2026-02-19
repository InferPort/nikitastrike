import React from 'react';
import { Terminal } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { useTranslation } from 'react-i18next';

export const HeaderNav: React.FC = () => {
    const { t } = useTranslation();

    return (
        <header className="fixed top-0 w-full z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-charcoal">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Terminal className="text-primary" size={24} />
                    <span className="font-bold tracking-tight text-lg uppercase">nikitastrike</span>
                </div>
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase">
                    <a className="hover:text-primary transition-colors" href="#home">{t('nav.home')}</a>
                    <a className="hover:text-primary transition-colors" href="#about">{t('nav.about')}</a>
                    <a className="hover:text-primary transition-colors" href="#experience">{t('nav.experience')}</a>
                    <a className="hover:text-primary transition-colors" href="#professional-projects">{t('nav.professional')}</a>
                    <a className="hover:text-primary transition-colors" href="#oss-tools">{t('nav.oss')}</a>
                    <a className="hover:text-primary transition-colors" href="#contact">{t('nav.contact')}</a>
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
