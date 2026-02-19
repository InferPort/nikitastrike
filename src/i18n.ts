import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    nav: {
                        home: 'Home',
                        about: 'About',
                        experience: 'Experience',
                        professional: 'Professional',
                        oss: 'OSS & Tools',
                        contact: 'Contact',
                        cta: 'Contact'
                    },
                    hero: {
                        role: 'Systems Architect',
                        tag_role: 'Role',
                        tag_focus: 'Focus',
                        tag_focus_val: 'Backend Engineering',
                        tag_spec: 'Specialization',
                        tag_spec_val: 'Reverse Engineering',
                        description: 'Engineering secure, data-driven backends and specialized technical tools with an emphasis on protocol analysis and systems integrity.'
                    },
                    about: {
                        title: 'Technical Methodology',
                        p1: 'I focus on building reliable systems by understanding the underlying data structures and communication protocols. My professional work centers on architecting robust backend logic for healthcare and licensing systems, while my personal research delves into binary analysis and network protocol inspection.',
                        p2: 'I prioritize honest engineering: selecting tools for their technical merit—such as Drizzle ORM for type-safe database interactions or Redis for managing state in distributed environments—rather than industry trends.'
                    },
                    experience: {
                        title: 'Professional History',
                    },
                    projects: {
                        title: 'Professional Projects',
                        subtitle: 'Technical Narratives & Challenges'
                    },
                    oss: {
                        title: 'OSS & Tools',
                        subtitle: 'Systems Research & Open Source Contributions'
                    },
                    contact: {
                        title: 'Contact',
                        description: 'Open to technical inquiries regarding systems architecture, reverse engineering projects, or high-integrity backend development.',
                        email: 'Email',
                        github: 'GitHub',
                        linkedin: 'LinkedIn',
                        orcid: 'ORCID'
                    }
                }
            },
            es: {
                translation: {
                    nav: {
                        home: 'Inicio',
                        about: 'Sobre mí',
                        experience: 'Experiencia',
                        professional: 'Proyectos',
                        oss: 'OSS y Herramientas',
                        contact: 'Contacto',
                        cta: 'Contactar'
                    },
                    hero: {
                        role: 'Arquitecto de Sistemas',
                        tag_role: 'Rol',
                        tag_focus: 'Enfoque',
                        tag_focus_val: 'Ingeniería Backend',
                        tag_spec: 'Especialización',
                        tag_spec_val: 'Ingeniería Inversa',
                        description: 'Ingeniería de backends seguros y orientados a datos, y herramientas técnicas especializadas con énfasis en análisis de protocolos e integridad de sistemas.'
                    },
                    about: {
                        title: 'Metodología Técnica',
                        p1: 'Me enfoco en construir sistemas confiables comprendiendo las estructuras de datos subyacentes y los protocolos de comunicación. Mi trabajo profesional se centra en la arquitectura de lógica backend robusta para sistemas de salud y licencias, mientras que mi investigación personal se adentra en el análisis binario y la inspección de protocolos de red.',
                        p2: 'Priorizo la ingeniería honesta: seleccionando herramientas por su mérito técnico, como Drizzle ORM para interacciones de base de datos seguras o Redis para gestionar el estado en entornos distribuidos, en lugar de tendencias de la industria.'
                    },
                    experience: {
                        title: 'Historial Profesional',
                    },
                    projects: {
                        title: 'Proyectos Profesionales',
                        subtitle: 'Narrativas Técnicas y Desafíos'
                    },
                    oss: {
                        title: 'OSS y Herramientas',
                        subtitle: 'Investigación de Sistemas y Contribuciones OSS'
                    },
                    contact: {
                        title: 'Contacto',
                        description: 'Abierto a consultas técnicas sobre arquitectura de sistemas, proyectos de ingeniería inversa o desarrollo backend de alta integridad.',
                        email: 'Correo',
                        github: 'GitHub',
                        linkedin: 'LinkedIn',
                        orcid: 'ORCID'
                    }
                }
            }
        }
    });

export default i18n;
