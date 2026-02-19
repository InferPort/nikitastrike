import { ExperienceItem } from '../types';

export const experience: ExperienceItem[] = [
    {
        year: "2021 — PRESENT",
        title: {
            en: "Systems Architect",
            es: "Arquitecto de Sistemas"
        },
        company: "Connectiva",
        responsibilities: {
            en: [
                "Architecting secure adapter layers for healthcare interoperability and governmental integrations.",
                "Implementing complex validation engines for regulatory compliance in billing systems."
            ],
            es: [
                "Arquitectura de capas de adaptador seguras para la interoperabilidad en salud e integraciones gubernamentales.",
                "Implementación de motores de validación complejos para el cumplimiento regulatorio en sistemas de facturación."
            ]
        }
    },
    {
        year: "2019 — 2021",
        title: {
            en: "Fullstack Engineer & IT Admin",
            es: "Ingeniero Fullstack y Administrador de TI"
        },
        company: "EPICO!",
        responsibilities: {
            en: [
                "Developed local-first POS systems with direct hardware protocol integration."
            ],
            es: [
                "Desarrollo de sistemas POS locales con integración directa de protocolos de hardware."
            ]
        }
    }
];
