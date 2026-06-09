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
    demoUrl?: string;
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

