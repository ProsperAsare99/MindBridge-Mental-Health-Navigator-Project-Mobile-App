import React, { createContext, useContext, useState, useEffect } from 'react';
import { COLORS, ThemeType } from '../theme/theme';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  colors: typeof COLORS.themes.slate; // Using slate as the shape reference
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('slate');

  const value = {
    theme,
    setTheme,
    colors: COLORS.themes[theme],
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
