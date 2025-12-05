import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const FavoritesContext = createContext(null);
const STORAGE_KEY = 'catalog-favorites';

/**
 * Load favorites from localStorage
 * @returns {string[]} Array of product IDs
 */
function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Save favorites to localStorage
 * @param {string[]} favorites - Array of product IDs
 */
function saveToStorage(favorites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // Storage might be full or disabled - fail silently
  }
}

/**
 * Provider component for favorites state
 */
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFromStorage);

  // Sync to localStorage whenever favorites change
  useEffect(() => {
    saveToStorage(favorites);
  }, [favorites]);

  const addFavorite = useCallback((productId) => {
    setFavorites(prev => 
      prev.includes(productId) ? prev : [...prev, productId]
    );
  }, []);

  const removeFavorite = useCallback((productId) => {
    setFavorites(prev => prev.filter(id => id !== productId));
  }, []);

  const toggleFavorite = useCallback((productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isFavorite = useCallback((productId) => {
    return favorites.includes(productId);
  }, [favorites]);

  const value = {
    favorites,
    count: favorites.length,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

/**
 * Hook to access favorites context
 * @returns {{
 *   favorites: string[],
 *   count: number,
 *   addFavorite: (id: string) => void,
 *   removeFavorite: (id: string) => void,
 *   toggleFavorite: (id: string) => void,
 *   isFavorite: (id: string) => boolean
 * }}
 */
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}
