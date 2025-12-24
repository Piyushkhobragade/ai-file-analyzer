// Theme configuration - centralized color palette and design tokens
// Modify colors here to update the entire app theme

export const colors = {
    // Primary brand colors
    krishnaBlue: '#1e3a8a',
    peacockTeal: '#115e59',
    peacockTealLight: '#2dd4bf',
    pitambarYellow: '#f59e0b',
    pitambarLight: '#facc15',

    // UI colors
    background: {
        primary: '#0f172a',
        secondary: '#1e293b',
        tertiary: '#334155',
    },

    text: {
        primary: '#ffffff',
        secondary: '#e2e8f0',
        muted: '#94a3b8',
    },

    // Particle colors
    particles: [
        '#2dd4bf', // Teal
        '#facc15', // Gold
        '#60a5fa', // Blue
        '#f472b6', // Pink
        '#ffffff', // White
    ],

    // Status colors
    status: {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
    },
} as const;

export const spacing = {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
} as const;

export const borderRadius = {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
} as const;

export const shadows = {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    glow: '0 0 20px rgba(245, 158, 11, 0.4)',
} as const;

export const typography = {
    fontFamily: {
        sans: 'system-ui, -apple-system, sans-serif',
        mono: 'ui-monospace, monospace',
    },
    fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
    },
} as const;

export const theme = {
    colors,
    spacing,
    borderRadius,
    shadows,
    typography,
} as const;

export type Theme = typeof theme;
