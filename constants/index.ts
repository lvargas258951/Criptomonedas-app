export * from './colors';
export * from './spacing';
export * from './typography';

// API related constants
export const API = {
  BASE_URL: 'https://api.coinlore.net/api',
  ENDPOINTS: {
    TICKERS: '/tickers/',
    TICKER: '/ticker/',
    GLOBAL: '/global/',
    MARKETS: '/coin/markets/',
  },
  PARAMS: {
    START: 'start',
    LIMIT: 'limit',
  },
  DEFAULT_LIMIT: 50,
};

// Local storage keys
export const STORAGE_KEYS = {
  FAVORITES: 'crypto_favorites',
  LANGUAGE: 'app_language',
  THEME: 'app_theme',
};

// Supported languages
export const LANGUAGES = {
  ENGLISH: 'en',
  SPANISH: 'es',
};

// Default number format options
export const NUMBER_FORMAT = {
  USD: {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  PERCENT: {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  NUMBER: {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  },
};