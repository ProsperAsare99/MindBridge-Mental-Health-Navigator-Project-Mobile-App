export const COLORS = {
  // Common Colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Luxury Design System
  themes: {
    slate: { // Light Theme (Matte Slate)
      primary: '#0077b6', // Ocean Blue
      secondary: '#f1f5f9', // Slate 100
      background: '#f8fafc', // Slate 50
      card: '#ffffff',
      text: '#020617', // Foreground
      textSecondary: '#64748b', // Slate 500
      border: '#94a3b8', // Slate 400
      stroke: '#f1f5f9',
    },
    carbon: { // Dark Theme (Carbon & Blue)
      primary: '#00b4d8', // Muted Blue
      secondary: '#27272a',
      background: '#0a0a0b', // Deeper Carbon
      card: '#18181b', // Matte Carbon
      text: '#d1d1c7', // Muted Parchment
      textSecondary: '#a1a1aa',
      border: 'rgba(0, 180, 216, 0.1)',
      stroke: '#64748b',
    },
    luxury: { // Luxury Theme (Profile & Settings)
      primary: '#d9c5b2', // Champagne Beige
      secondary: '#fdfcf9', // Ivory
      background: '#fdfcf9',
      card: '#ffffff',
      text: '#1c1c1c', // Obsidian
      textSecondary: '#8d8d8d',
      border: '#d9c5b2',
      stroke: '#e2e8f0',
    },
    'luxury-dark': { // Luxury Dark Variant
      primary: '#f5f5f0', // Cream
      secondary: '#262626',
      background: '#1c1c1c', // Obsidian Black
      card: '#262626',
      text: '#f5f5f0',
      textSecondary: '#a3a3a3',
      border: '#404040',
      stroke: '#404040',
    }
  },

  // Functional Colors
  error: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
  distress: '#be123c',
};

export const TYPOGRAPHY = {
  fonts: {
    regular: 'System', // Will update once custom fonts are loaded
    medium: 'System',
    bold: 'System',
    heading: 'System',
  },
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const SHADOWS = {
  premium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
};

export type ThemeType = keyof typeof COLORS.themes;
