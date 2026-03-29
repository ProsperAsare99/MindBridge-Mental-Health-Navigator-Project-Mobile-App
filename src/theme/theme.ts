export const COLORS = {
  // Common Colors
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Theme Variations
  themes: {
    stability: {
      primary: '#4F46E5', // Indigo 600
      secondary: '#E0E7FF', // Indigo 100
      accent: '#818CF8', // Indigo 400
      background: '#F5F7FF',
      card: '#FFFFFF',
      text: '#312E81',
      textSecondary: '#6366F1', // Indigo 500
      border: '#E0E7FF',
      icon: 'Zen',
    },
    calm: {
      primary: '#0D9488', // Teal 600
      secondary: '#CCFBF1', // Teal 100
      accent: '#2DD4BF', // Teal 400
      background: '#F0FDFA',
      card: '#FFFFFF',
      text: '#134E48',
      textSecondary: '#14B8A6', // Teal 500
      border: '#CCFBF1',
      icon: 'Focus',
    },
    energy: {
      primary: '#0284C7', // Sky 600
      secondary: '#E0F2FE', // Sky 100
      accent: '#38BDF8', // Sky 400
      background: '#F0F9FF',
      card: '#FFFFFF',
      text: '#0C4A6E',
      textSecondary: '#0EA5E9', // Sky 500
      border: '#E0F2FE',
      icon: 'Action',
    },
  },

  // Functional Colors
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  distress: '#BE123C', // Pulsing Rose/Crimson
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
