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
    const [scrollProgress, setScrollProgress] = useState(0);
    const [navHovered, setNavHovered] = useState(false);

    const isHome = pathname === '/';

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 10);
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
        };
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
        <header
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-500 h-12",
                scrolled
                    ? "bg-surface/90 backdrop-blur-xl"
                    : "bg-surface/20 backdrop-blur-sm"
            )}
            onMouseEnter={() => setNavHovered(true)}
            onMouseLeave={() => setNavHovered(false)}
        >
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-all duration-300 active:scale-95 shrink-0">
                        <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center shadow-[0_0_10px_rgba(74,142,255,0.2)]">
                            <Terminal className="text-white" size={14} />
                        </div>
                    </Link>
                    <nav className="hidden md:flex items-center gap-5 text-[11px] font-bold tracking-[0.12em] uppercase">
                        {navLinks.map((link, i) => (
                            <Link
                                key={link.id}
                                className={cn(
                                    "text-ink-dim hover:text-primary transition-all duration-300 whitespace-nowrap",
                                    navHovered
                                        ? "opacity-100 translate-x-0 pointer-events-auto"
                                        : "opacity-0 translate-x-[-12px] pointer-events-none"
                                )}
                                style={{
                                    transitionDelay: navHovered ? `${80 + i * 50}ms` : '0ms',
                                    transitionDuration: '400ms',
                                }}
                                to={link.href}
                                onClick={() => scrollIntoView(link.id)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center gap-3">
                    <LanguageToggle />
                    <div
                        className={cn(
                            "hidden md:flex items-center gap-3 transition-all duration-300",
                            navHovered
                                ? "opacity-100 translate-x-0 pointer-events-auto"
                                : "opacity-0 translate-x-[12px] pointer-events-none"
                        )}
                        style={{
                            transitionDelay: navHovered ? `${80 + navLinks.length * 50 + 80}ms` : '0ms',
                            transitionDuration: '400ms',
                        }}
                    >
                        <a
                            className="bg-primary text-white px-3 py-1.5 rounded-md text-[11px] font-bold tracking-wide hover:bg-primary-dim transition-all duration-300"
                            href="mailto:me@nikitastrike.co"
                        >
                            {t('nav.cta')}
                        </a>
                    </div>
                    <button
                        className="md:hidden text-light-text hover:text-primary transition-colors"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-line/30">
                <div
                    className="h-full bg-primary transition-all duration-150 ease-out"
                    style={{ width: `${scrollProgress * 100}%` }}
                />
            </div>

            <div
                className={cn(
                    "md:hidden fixed inset-x-0 top-12 bg-surface/95 backdrop-blur-xl border-b border-line transition-all duration-400 overflow-hidden",
                    menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
            >
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
