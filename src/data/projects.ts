import { Project } from '../types';

export const projects: Project[] = [
    {
        title: "Agendify",
        company: "Connectiva",
        role: "Systems Architect",
        description: {
            en: "Engineered the backend scheduling logic to synchronize medical appointments with FHIR-compliant hospital databases. The solution involved implementing an adapter layer to map unstructured requests into validated FHIR resources and utilizing Redis-backed notification queues to manage multi-channel reminders, ensuring consistency across asynchronous services.",
            es: "Desarrollé la lógica de programación backend para sincronizar citas médicas con bases de datos hospitalarias compatibles con FHIR. La solución incluyó la implementación de una capa de adaptador para mapear solicitudes no estructuradas en recursos FHIR validados y el uso de colas de notificación respaldadas por Redis para gestionar recordatorios multicanal, garantizando la consistencia en servicios asíncronos."
        },
        tags: ["FHIR", "Redis", "Node.js", "HealthTech"]
    },
    {
        title: "Ripsify",
        company: "Connectiva",
        role: "Systems Architect",
        description: {
            en: "Designed a rule-based validation engine to ensure compliance with Resolution 2275 for healthcare billing. The technical challenge centered on mapping diverse ERP data structures to strict government-mandated schemas. I implemented a modular validation pipeline that inspects data at the record level before final transmission.",
            es: "Diseñé un motor de validación basado en reglas para garantizar el cumplimiento de la Resolución 2275 para la facturación de servicios de salud. El desafío técnico se centró en mapear diversas estructuras de datos de ERP a esquemas estrictos exigidos por el gobierno. Implementé un flujo de validación modular que inspecciona los datos a nivel de registro antes de la transmisión final."
        },
        tags: ["Healthcare Billing", "Data Validation", "ERP Integration"]
    },
    {
        title: "SMS",
        company: "Connectiva",
        role: "Software Engineer",
        description: {
            en: "Developed a licensing and distribution system for proprietary binaries. I implemented a security model based on RSA encryption and 'timebomb' JWT tokens that expire autonomously to prevent unauthorized use. The system maintains client-server synchronization via WebSocket heartbeats, ensuring license state is validated in real-time.",
            es: "Desarrollé un sistema de licencias y distribución para binarios propietarios. Implementé un modelo de seguridad basado en cifrado RSA y tokens JWT 'timebomb' que caducan de forma autónoma para evitar el uso no autorizado. El sistema mantiene la sincronización cliente-servidor a través de heartbeats de WebSocket, asegurando que el estado de la licencia se valide en tiempo real."
        },
        tags: ["RSA Encryption", "JWT", "WebSockets", "Security"]
    },
    {
        title: "Teseo",
        company: "Connectiva",
        role: "Infrastructure Lead",
        description: {
            en: "Architected an adapter-based system for interfacing with government entity APIs. I utilized Drizzle ORM for type-safe database interactions and implemented AES-256-GCM encryption for securing sensitive tenant credentials. The architecture focuses on strict data isolation between multiple organizational tenants.",
            es: "Arquitecté un sistema basado en adaptadores para interactuar con las API de entidades gubernamentales. Utilicé Drizzle ORM para interacciones de base de datos seguras y tipos seguros, e implementé cifrado AES-256-GCM para asegurar las credenciales sensibles de los inquilinos. La arquitectura se enfoca en el aislamiento estricto de datos entre múltiples inquilinos organizacionales."
        },
        tags: ["Drizzle ORM", "AES-256-GCM", "Multitenancy", "Infrastructure"]
    },
    {
        title: "EPICO POS",
        company: "EPICO!",
        role: "Fullstack Engineer",
        description: {
            en: "Developed local-first POS systems with direct hardware protocol integration. Implementation included DIAN e-invoicing, async bidirectional backups (Easybak), and sticker printer integration.",
            es: "Desarrollé sistemas POS locales con integración directa de protocolos de hardware. La implementación incluyó facturación electrónica de la DIAN, copias de seguridad bidireccionales asíncronas (Easybak) e integración con impresoras de etiquetas."
        },
        tags: ["POS Systems", "Hardware Integration", "e-Invoicing"]
    }
];
