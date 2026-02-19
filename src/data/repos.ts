import { Repo } from '../types';

export const repos: Repo[] = [
    {
        name: "mgps",
        type: "Private Server Development",
        description: {
            en: "A project focused on the reverse engineering of the Mundo Gaturro private server protocol. I performed deep packet analysis to reconstruct undocumented binary communication patterns, enabling the implementation of a custom server-side handler for legacy client interactions.",
            es: "Un proyecto enfocado en la ingeniería inversa del protocolo del servidor privado de Mundo Gaturro. Realicé un análisis profundo de paquetes para reconstruir patrones de comunicación binarios no documentados, permitiendo la implementación de un controlador personalizado en el lado del servidor para las interacciones con el cliente legado."
        },
        githubUrl: "https://github.com/nikitacontreras/mgps",
        tags: ["Reverse Engineering", "Binary Protocols", "Packet Analysis"]
    },
    {
        name: "roomie",
        type: "Binary Metadata Extraction",
        description: {
            en: "A library developed for extracting metadata from legacy console ROM binaries. I implemented binary signature matching and hashing logic to identify and catalog software assets by their internal structure, solving challenges in large-scale dataset organization.",
            es: "Una biblioteca desarrollada para la extracción de metadatos de binarios ROM de consolas antiguas. Implementé lógica de coincidencia de firmas binarias y hashing para identificar y catalogar activos de software mediante su estructura interna, resolviendo desafíos en la organización de conjuntos de datos a gran escala."
        },
        githubUrl: "https://github.com/nikitacontreras/roomie",
        npmUrl: "https://npmjs.com/package/roomie",
        tags: ["Binary Data", "ROMs", "Node.js"]
    },
    {
        name: "chaturbapi",
        type: "API Wrapper",
        description: {
            en: "A TypeScript-based wrapper for the Chaturbate Affiliate API, providing a structured and programmatic interface for service interactions.",
            es: "Un wrapper basado en TypeScript para la API de afiliados de Chaturbate, proporcionando una interfaz estructurada y programática para interactuar con los servicios."
        },
        githubUrl: "https://github.com/nikitacontreras/chaturbapi",
        npmUrl: "https://npmjs.com/package/chaturbapi",
        tags: ["TypeScript", "API Wrapper", "Node.js"]
    },
    {
        name: "wavevault",
        type: "Backend Audio Management",
        description: {
            en: "An audio management backend designed for precise signal handling. I focused on building an efficient storage and retrieval system that maintains high fidelity, managing audio buffers and metadata with minimal overhead for streaming applications.",
            es: "Un backend de gestión de audio diseñado para el manejo preciso de señales. Me enfocqué en construir un sistema de almacenamiento y recuperación eficiente que mantiene la alta fidelidad, gestionando búferes de audio y metadatos con una sobrecarga mínima para aplicaciones de streaming."
        },
        githubUrl: "https://github.com/nikitacontreras/wavevault",
        tags: ["Audio Engineering", "Backend", "Asset Management"]
    }
];
