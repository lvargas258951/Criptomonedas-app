import React, { createContext, useState, useEffect, useContext } from 'react';
import { StorageService } from '@/services';

interface FavoritesContextProps {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextProps>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
  toggleFavorite: () => {},
});

/**
 * Provider component for favorites context
 */
export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from storage on mount
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await StorageService.getFavorites();
        setFavorites(savedFavorites);
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadFavorites();
  }, []);

  // Add a cryptocurrency to favorites
  const addFavorite = async (id: string) => {
    try {
      if (!favorites.includes(id)) {
        const newFavorites = [...favorites, id];
        await StorageService.saveFavorites(newFavorites);
        setFavorites(newFavorites);
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  // Remove a cryptocurrency from favorites
  const removeFavorite = async (id: string) => {
    try {
      const newFavorites = favorites.filter((favId) => favId !== id);
      await StorageService.saveFavorites(newFavorites);
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  // Check if a cryptocurrency is in favorites
  const isFavorite = (id: string): boolean => {
    return favorites.includes(id);
  };

  // Toggle a cryptocurrency in favorites
  const toggleFavorite = (id: string) => {
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

/**
 * Hook for using the favorites context
 */
export const useFavorites = () => useContext(FavoritesContext);