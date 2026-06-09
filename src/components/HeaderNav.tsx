import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';

export const HeaderNav: React.FC = () => {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const isHome = pathname === '/';

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollIntoView = (id: string) => {
        setMenuOpen(false);
        if (isHome) {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navLinks = [
        { label: t('nav.home'), href: '/', id: 'home' },
        { label: t('nav.about'), href: isHome ? '#about' : '/#about', id: 'about' },
        { label: t('nav.experience'), href: isHome ? '#experience' : '/#experience', id: 'experience' },
        { label: t('nav.professional'), href: isHome ? '#professional-projects' : '/#professional-projects', id: 'professional-projects' },
        { label: t('nav.oss'), href: isHome ? '#oss-tools' : '/#oss-tools', id: 'oss-tools' },
        { label: t('nav.contact'), href: isHome ? '#contact' : '/#contact', id: 'contact' },
    ];

    return (
        <header className={cn(
            "fixed top-0 w-full z-50 transition-all duration-500",
            scrolled
                ? "bg-surface/90 backdrop-blur-xl border-b border-line"
                : "bg-surface/50 backdrop-blur-md border-b border-transparent"
        )}>
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 active:scale-95">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Terminal className="text-white" size={16} />
                    </div>
                    <span className="font-bold tracking-tight text-lg">nikitastrike</span>
                </Link>
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
                    {navLinks.map((link) => (
                        <Link
                            key={link.id}
                            className="relative text-ink-dim hover:text-primary transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                            to={link.href}
                            onClick={() => scrollIntoView(link.id)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-4">
                    <LanguageToggle />
                    <a
                        className="hidden md:inline-flex bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold tracking-wide hover:bg-primary-dim transition-all duration-300 active:scale-[0.97]"
                        href="mailto:me@nikitastrike.co"
                    >
                        {t('nav.cta')}
                    </a>
                    <button
                        className="md:hidden text-light-text hover:text-primary transition-colors"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <div className={cn(
                "md:hidden fixed inset-x-0 top-16 bg-surface/95 backdrop-blur-xl border-b border-line transition-all duration-400 overflow-hidden",
                menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}>
                <nav className="flex flex-col px-6 py-6 gap-4">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.id}
                            className="text-sm font-bold tracking-wide text-ink-dim hover:text-primary transition-colors duration-300 py-2"
                            to={link.href}
                            onClick={() => scrollIntoView(link.id)}
                            style={{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <a
                        className="bg-primary text-white px-5 py-3 rounded-lg text-sm font-bold tracking-wide text-center mt-4"
                        href="mailto:me@nikitastrike.co"
                        onClick={() => setMenuOpen(false)}
                    >
                        {t('nav.cta')}
                    </a>
                </nav>
            </div>
        </header>
    );
};
