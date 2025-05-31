import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthContext';


export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);
  const storageKey = user ? `favorites_${user.username}` : null;

  useEffect(() => {
    const loadFavorites = async () => {
      if (!storageKey) return;
      const data = await AsyncStorage.getItem(storageKey);
      if (data) setFavorites(JSON.parse(data));
    };
    loadFavorites();
  }, [storageKey]);

  useEffect(() => {
    AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const loadFavorites = async () => {
    const json = await AsyncStorage.getItem('favorites');
    if (json) setFavorites(JSON.parse(json));
  };

  const addFavorite = async (recipe) => {
    if (!storageKey) return;
    const updated = [...favorites, recipe];
    setFavorites(updated);
    await AsyncStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const removeFavorite = async (idMeal) => {
    if (!storageKey) return;
    const updated = favorites.filter(r => r.idMeal !== idMeal);
    setFavorites(updated);
    await AsyncStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const isFavorite = (id) => favorites.some((r) => r.idMeal === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
