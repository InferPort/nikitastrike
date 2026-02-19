export interface Project {
    title: string;
    company: string;
    role: string;
    description: {
        en: string;
        es: string;
    };
    tags?: string[];
}

export interface Repo {
    name: string;
    type: string;
    description: {
        en: string;
        es: string;
    };
    githubUrl: string;
    npmUrl?: string;
    tags?: string[];
}

export interface ExperienceItem {
    year: string;
    title: {
        en: string;
        es: string;
    };
    company: string;
    responsibilities: {
        en: string[];
        es: string[];
    };
}

export interface SectionProps {
    id: string;
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
}
