import React from 'react';
import { Project } from '../types';
import { TagList } from './TagList';
import { useTranslation } from 'react-i18next';

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const { i18n } = useTranslation();
    const currentLang = (i18n.language.split('-')[0] || 'en') as 'en' | 'es';

    return (
        <div className="flex flex-col border-t border-charcoal pt-8">
            <div className="mb-6">
                <h4 className="text-2xl font-bold mb-1">{project.title}</h4>
                <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">
                    {project.company} / {project.role}
                </span>
            </div>
            <p className="text-slate-400 font-light leading-relaxed">
                {project.description[currentLang]}
            </p>
            {project.tags && <TagList tags={project.tags} />}
        </div>
    );
};
