import React from 'react';
import { Repo } from '../types';
import { Code, Package, Play } from 'lucide-react';
import { TagList } from './TagList';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const RepoCard: React.FC<{ repo: Repo }> = ({ repo }) => {
    const { t, i18n } = useTranslation();
    const currentLang = (i18n.language.split('-')[0] || 'en') as 'en' | 'es';

    return (
        <div className="flex flex-col border-t border-charcoal pt-8">
            <div className="mb-6 flex justify-between items-start">
                <div>
                    <h4 className="text-2xl font-bold mb-1">{repo.name}</h4>
                    <span className="text-xs text-primary uppercase font-bold tracking-widest">{repo.type}</span>
                </div>
                <div className="flex gap-4">
                    <a className="oss-link" href={repo.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Code size={14} /> Repository
                    </a>
                    {repo.npmUrl && (
                        <a className="oss-link" href={repo.npmUrl} target="_blank" rel="noopener noreferrer">
                            <Package size={14} /> Package
                        </a>
                    )}
                    {repo.demoUrl && (
                        <Link className="oss-link text-primary" to={repo.demoUrl}>
                            <Play size={14} fill="currentColor" /> {currentLang === 'es' ? 'Ver demo' : 'View demo'}
                        </Link>
                    )}
                </div>
            </div>
            <p className="text-slate-400 font-light leading-relaxed">
                {repo.description[currentLang]}
            </p>
            {repo.tags && <TagList tags={repo.tags} />}
        </div>
    );
};

