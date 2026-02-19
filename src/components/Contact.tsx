import React from 'react';
import { useTranslation } from 'react-i18next';

export const Contact: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
                <h3 className="text-3xl font-bold uppercase tracking-tight mb-8">{t('contact.title')}</h3>
                <p className="text-slate-400 text-lg mb-12 max-w-sm">
                    {t('contact.description')}
                </p>
            </div>
            <div className="md:col-span-7 flex flex-col gap-12">
                <div>
                    <a className="text-3xl md:text-5xl font-bold block mb-4 hover:text-primary transition-colors" href="mailto:me@nikitastrike.co">
                        me@nikitastrike.co
                    </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-charcoal">
                    <div>
                        <span className="text-xs uppercase tracking-widest text-slate-500 mb-2 block">{t('contact.github')}</span>
                        <a className="text-lg font-medium hover:text-primary transition-colors" href="https://github.com/nikitacontreras" target="_blank" rel="noopener noreferrer">
                            github.com/nikitacontreras
                        </a>
                    </div>
                    <div>
                        <span className="text-xs uppercase tracking-widest text-slate-500 mb-2 block">{t('contact.linkedin')}</span>
                        <a className="text-lg font-medium hover:text-primary transition-colors" href="https://linkedin.com/in/nikitastrike" target="_blank" rel="noopener noreferrer">
                            linkedin.com/in/nikitastrike
                        </a>
                    </div>
                    <div>
                        <span className="text-xs uppercase tracking-widest text-slate-500 mb-2 block">{t('contact.orcid')}</span>
                        <a className="text-lg font-medium hover:text-primary transition-colors" href="https://orcid.org/0009-0006-9512-6504" target="_blank" rel="noopener noreferrer">
                            orcid.0009-0006-9512-6504
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
