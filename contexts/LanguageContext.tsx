import React, { createContext, useState, useEffect, useContext } from 'react';
import { I18n } from '@/i18n';
import { StorageService } from '@/services';
import { LANGUAGES } from '@/constants';

interface LanguageContextProps {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, params?: object) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: LANGUAGES.ENGLISH,
  setLanguage: () => {},
  t: (key: string) => key,
});

/**
 * Provider component for language context
 */
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState(LANGUAGES.ENGLISH);
  const i18n = new I18n();

  // Load saved language from storage on mount
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await StorageService.getLanguage();
        if (savedLanguage && i18n.isLanguageSupported(savedLanguage)) {
          setLanguageState(savedLanguage);
        }
      } catch (error) {
        console.error('Error loading language:', error);
      }
    };

    loadLanguage();
  }, []);

  // Save language to storage when it changes
  const setLanguage = async (lang: string) => {
    try {
      if (i18n.isLanguageSupported(lang)) {
        await StorageService.saveLanguage(lang);
        setLanguageState(lang);
      }
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  // Translation function
  const t = (key: string, params?: object): string => {
    return i18n.translate(key, language, params);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Hook for using the language context
 */
export const useLanguage = () => useContext(LanguageContext);