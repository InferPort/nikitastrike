/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                "primary": "#4a8eff",
                "primary-dim": "#3570d4",
                "primary-subtle": "#1a2740",
                "warm-accent": "#c97a3a",
                "warm-subtle": "#2a1f14",
                "surface": "#141517",
                "surface-elevated": "#1b1d21",
                "surface-raised": "#23252a",
                "light-text": "#eceef0",
                "ink-dim": "#939aa6",
                "ink-muted": "#6b7380",
                "line": "#2b2e35",
                "line-light": "#363a42",
            },
            fontFamily: {
                "display": ["Sora", "sans-serif"],
                "body": ["Sora", "sans-serif"],
                "mono": ["JetBrains Mono", "monospace"],
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem",
                "full": "9999px"
            },
            maxWidth: {
                "prose-narrow": "65ch",
            },
            keyframes: {
                "scan": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(4px)" },
                },
            },
            animation: {
                "scan": "scan 3s ease-in-out infinite",
            },
        },
    },
    plugins: [],
}
