import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LanguageToggle: React.FC = () => {
    const { i18n } = useTranslation();

    const toggle = () => {
        const nextLang = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(nextLang);
    };

    return (
        <button
            onClick={toggle}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors border border-charcoal px-3 py-1.5 rounded-full"
        >
            <Globe size={12} />
            {i18n.language.toUpperCase().split('-')[0]}
        </button>
    );
};
