import React from 'react';
import { Project } from '../types';
import { TagList } from './TagList';
import { useTranslation } from 'react-i18next';

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const { i18n } = useTranslation();
    const currentLang = (i18n.language.split('-')[0] || 'en') as 'en' | 'es';

    return (
        <div className="group bg-surface-elevated border border-line rounded-xl p-8 transition-colors duration-300 hover:border-primary/20">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-xs text-ink-muted font-bold tracking-widest">{project.company}</span>
                <span className="w-1 h-1 rounded-full bg-ink-muted/30" />
                <span className="text-xs text-primary font-bold tracking-widest">{project.role}</span>
            </div>
            <h4 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">{project.title}</h4>
            <p className="text-ink-dim font-light leading-relaxed text-[15px]">
                {project.description[currentLang]}
            </p>
            {project.tags && <TagList tags={project.tags} />}
        </div>
    );
};
