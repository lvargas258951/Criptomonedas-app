import React, { createContext, useState, useEffect, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { StorageService } from '@/services';
import { ThemeType } from '@/constants';

interface ThemeContextProps {
  theme: ThemeType;
  isDarkMode: boolean;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  isDarkMode: false,
  setTheme: () => {},
  toggleTheme: () => {},
});

/**
 * Provider component for theme context
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemeType>(colorScheme as ThemeType || 'light');

  // Load saved theme from storage on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await StorageService.getTheme();
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
          setThemeState(savedTheme as ThemeType);
        } else {
          // Use system theme if no saved theme
          setThemeState(colorScheme as ThemeType || 'light');
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };

    loadTheme();
  }, [colorScheme]);

  // Save theme to storage when it changes
  const setTheme = async (newTheme: ThemeType) => {
    try {
      await StorageService.saveTheme(newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDarkMode: theme === 'dark',
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook for using the theme context
 */
export const useTheme = () => useContext(ThemeContext);