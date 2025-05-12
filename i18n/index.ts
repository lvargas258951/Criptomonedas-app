import { en } from './translations/en';
import { es } from './translations/es';
import { LANGUAGES } from '@/constants';

export class I18n {
  private translations: { [key: string]: any } = {
    [LANGUAGES.ENGLISH]: en,
    [LANGUAGES.SPANISH]: es,
  };

  /**
   * Translates a key into the selected language
   * @param key Translation key (dot notation supported)
   * @param language Target language
   * @param params Optional parameters for string interpolation
   * @returns Translated string
   */
  translate(key: string, language: string, params?: object): string {
    // Default to English if language not supported
    if (!this.isLanguageSupported(language)) {
      language = LANGUAGES.ENGLISH;
    }

    // Get the nested value from the translations object
    const value = this.getNestedValue(this.translations[language], key);

    // Return the key if translation is not found
    if (value === undefined) {
      return key;
    }

    // Return the translation (with parameter substitution if needed)
    if (params) {
      return this.substituteParams(value, params);
    }

    return value;
  }

  /**
   * Checks if a language is supported
   * @param language Language code to check
   * @returns Whether the language is supported
   */
  isLanguageSupported(language: string): boolean {
    return Object.keys(this.translations).includes(language);
  }

  /**
   * Gets all supported languages
   * @returns Array of supported language codes
   */
  getSupportedLanguages(): string[] {
    return Object.keys(this.translations);
  }

  /**
   * Gets a nested value from an object using dot notation
   * @param obj Source object
   * @param path Path to the value (e.g., 'home.title')
   * @returns The value at the specified path
   */
  private getNestedValue(obj: any, path: string): any {
    const keys = path.split('.');
    return keys.reduce((o, key) => (o && o[key] !== undefined ? o[key] : undefined), obj);
  }

  /**
   * Substitutes parameters in a string
   * @param str String with placeholders in the format {{paramName}}
   * @param params Object with parameter values
   * @returns String with substituted parameters
   */
  private substituteParams(str: string, params: object): string {
    return str.replace(/{{(\w+)}}/g, (match, paramName) => {
      return params.hasOwnProperty(paramName) ? params[paramName] : match;
    });
  }
}