import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/constants';

/**
 * Service responsible for handling local storage operations
 */
export class StorageService {
  /**
   * Saves favorite cryptocurrencies to local storage
   * @param favorites Array of favorite cryptocurrency IDs
   */
  static async saveFavorites(favorites: string[]): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.FAVORITES,
        JSON.stringify(favorites)
      );
    } catch (error) {
      console.error('Error saving favorites:', error);
      throw error;
    }
  }

  /**
   * Retrieves favorite cryptocurrencies from local storage
   * @returns Promise with array of favorite cryptocurrency IDs
   */
  static async getFavorites(): Promise<string[]> {
    try {
      const favorites = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }

  /**
   * Adds a cryptocurrency to favorites
   * @param id Cryptocurrency ID to add
   */
  static async addFavorite(id: string): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      if (!favorites.includes(id)) {
        favorites.push(id);
        await this.saveFavorites(favorites);
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  }

  /**
   * Removes a cryptocurrency from favorites
   * @param id Cryptocurrency ID to remove
   */
  static async removeFavorite(id: string): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const updatedFavorites = favorites.filter((favId) => favId !== id);
      await this.saveFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  }

  /**
   * Saves the currently selected language to local storage
   * @param language Language code
   */
  static async saveLanguage(language: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
    } catch (error) {
      console.error('Error saving language:', error);
      throw error;
    }
  }

  /**
   * Retrieves the currently selected language from local storage
   * @returns Promise with language code
   */
  static async getLanguage(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE);
    } catch (error) {
      console.error('Error getting language:', error);
      return null;
    }
  }

  /**
   * Saves the currently selected theme to local storage
   * @param theme Theme name
   */
  static async saveTheme(theme: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (error) {
      console.error('Error saving theme:', error);
      throw error;
    }
  }

  /**
   * Retrieves the currently selected theme from local storage
   * @returns Promise with theme name
   */
  static async getTheme(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.THEME);
    } catch (error) {
      console.error('Error getting theme:', error);
      return null;
    }
  }
}