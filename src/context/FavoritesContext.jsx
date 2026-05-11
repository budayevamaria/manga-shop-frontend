import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const token = localStorage.getItem("token");

  const storageKey = token ? `favorites_${token}` : "favorites_guest";

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (!token) return;

    localStorage.setItem(storageKey, JSON.stringify(favorites));
  }, [favorites, storageKey, token]);

  const addToFavorites = item => {
    setFavorites(prev => {
      if (prev.find(i => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromFavorites = id => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const clearFavorites = () => {
    setFavorites([]);

    if (token) {
      localStorage.removeItem(storageKey);
    }
  };

  useEffect(() => {
    if (!token) {
      setFavorites([]);
    }
  }, [token]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
