import React from 'react';
import { useTranslation } from 'react-i18next';

export const Contact: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-5">
                <h3 className="text-3xl font-bold tracking-tight mb-6">{t('contact.title')}</h3>
                <p className="text-ink-dim text-lg max-w-sm leading-relaxed">
                    {t('contact.description')}
                </p>
            </div>
            <div className="md:col-span-7 flex flex-col gap-12">
                <div className="border-b border-line pb-8">
                    <span className="text-[10px] uppercase tracking-widest text-ink-muted mb-2 block">Email</span>
                    <a className="text-3xl md:text-5xl font-bold tracking-tight hover:text-primary transition-colors duration-300" href="mailto:me@nikitastrike.co">
                        me@nikitastrike.co
                    </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <div>
                        <span className="text-[10px] uppercase tracking-widest text-ink-muted mb-2 block">{t('contact.github')}</span>
                        <a className="text-base font-medium hover:text-primary transition-colors duration-300" href="https://github.com/nikitacontreras" target="_blank" rel="noopener noreferrer">
                            github.com/<span className="text-primary">nikitacontreras</span>
                        </a>
                    </div>
                    <div>
                        <span className="text-[10px] uppercase tracking-widest text-ink-muted mb-2 block">{t('contact.linkedin')}</span>
                        <a className="text-base font-medium hover:text-primary transition-colors duration-300" href="https://linkedin.com/in/nikitastrike" target="_blank" rel="noopener noreferrer">
                            linkedin.com/<span className="text-primary">in/nikitastrike</span>
                        </a>
                    </div>
                    <div>
                        <span className="text-[10px] uppercase tracking-widest text-ink-muted mb-2 block">{t('contact.orcid')}</span>
                        <a className="text-base font-medium hover:text-primary transition-colors duration-300 font-mono text-xs" href="https://orcid.org/0009-0006-9512-6504" target="_blank" rel="noopener noreferrer">
                            <span className="text-primary">0009-0006-9512-6504</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
