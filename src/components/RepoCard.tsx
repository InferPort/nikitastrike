import React from 'react';
import { Repo } from '../types';
import { Code, Package, Play } from 'lucide-react';
import { TagList } from './TagList';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const RepoCard: React.FC<{ repo: Repo }> = ({ repo }) => {
    const { i18n } = useTranslation();
    const currentLang = (i18n.language.split('-')[0] || 'en') as 'en' | 'es';

    return (
        <div className="group bg-surface-elevated border border-line rounded-xl p-8 transition-colors duration-300 hover:border-primary/20">
            <div className="flex items-start justify-between mb-5">
                <div>
                    <h4 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors duration-300">{repo.name}</h4>
                    <span className="text-xs text-primary font-bold tracking-widest">{repo.type}</span>
                </div>
                <div className="flex gap-3">
                    <a className="oss-link" href={repo.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Code size={14} /> Source
                    </a>
                    {repo.npmUrl && (
                        <a className="oss-link" href={repo.npmUrl} target="_blank" rel="noopener noreferrer">
                            <Package size={14} /> Package
                        </a>
                    )}
                    {repo.demoUrl && (
                        <Link className="oss-link text-primary hover:text-primary-dim transition-colors" to={repo.demoUrl}>
                            <Play size={14} fill="currentColor" /> {currentLang === 'es' ? 'Demo' : 'Demo'}
                        </Link>
                    )}
                </div>
            </div>
            <p className="text-ink-dim font-light leading-relaxed text-[15px]">
                {repo.description[currentLang]}
            </p>
            {repo.tags && <TagList tags={repo.tags} />}
        </div>
    );
};
