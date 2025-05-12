/**
 * Application color palette
 * Follows an 8-point design system with consistent color usage
 */
export const Colors = {
  // Primary colors
  primary: {
    light: '#0080FF',
    main: '#0066CC',
    dark: '#004C99',
  },
  // Secondary/accent colors
  accent: {
    light: '#FFE14D',
    main: '#FFD700',
    dark: '#E6C200',
  },
  // Success state colors
  success: {
    light: '#66BB6A',
    main: '#4CAF50',
    dark: '#388E3C',
  },
  // Error state colors
  error: {
    light: '#EF5350',
    main: '#F44336',
    dark: '#D32F2F',
  },
  // Warning state colors
  warning: {
    light: '#FFB74D',
    main: '#FFA726',
    dark: '#F57C00',
  },
  // Neutral colors
  neutral: {
    white: '#FFFFFF',
    lightest: '#F5F5F5',
    lighter: '#EEEEEE',
    light: '#E0E0E0',
    medium: '#9E9E9E',
    dark: '#616161',
    darker: '#424242',
    darkest: '#212121',
    black: '#000000',
  },
  // Theme specific colors
  light: {
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#212121',
    textSecondary: '#757575',
    border: '#E0E0E0',
  },
  dark: {
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    border: '#333333',
  },
};

export type ThemeType = 'light' | 'dark';