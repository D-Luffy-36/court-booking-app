import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx,css}",
        "./src/**/*.{js,ts,jsx,tsx,mdx,css}",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                surface: "hsl(var(--surface))",
                "surface-elevated": "hsl(var(--surface-elevated))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    hover: "hsl(var(--primary-hover))",
                    light: "hsl(var(--primary-light))",
                },
                text: {
                    primary: "hsl(var(--text-primary))",
                    secondary: "hsl(var(--text-secondary))",
                    muted: "hsl(var(--text-muted))",
                },
                border: {
                    DEFAULT: "hsl(var(--border))",
                    light: "hsl(var(--border-light))",
                },
                error: {
                    DEFAULT: "hsl(var(--error))",
                    bg: "hsl(var(--error-bg))",
                },
                success: {
                    DEFAULT: "hsl(var(--success))",
                    bg: "hsl(var(--success-bg))",
                },
                warning: "hsl(var(--warning))",
                skeleton: {
                    DEFAULT: "hsl(var(--skeleton))",
                    shimmer: "hsl(var(--skeleton-shimmer))",
                },
            },
            animation: {
                shimmer: "shimmer 2s infinite linear",
                check: "check 0.5s ease-in-out",
            },
            keyframes: {
                shimmer: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(100%)" },
                },
                check: {
                    "0%": { transform: "scale(0)" },
                    "50%": { transform: "scale(1.2)" },
                    "100%": { transform: "scale(1)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;