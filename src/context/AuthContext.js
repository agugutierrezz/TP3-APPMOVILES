import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadUser = async () => {
      try {
        const json = await AsyncStorage.getItem('loggedUser');
        if (json) setUser(JSON.parse(json));
      } catch (err) {
        console.error('Error cargando usuario', err);
      }
      setLoading(false); // ← esto debe ejecutarse siempre
    };
    loadUser();
  }, []);

  const login = async (username, password) => {
    const data = await AsyncStorage.getItem('users');
    const users = data ? JSON.parse(data) : [];
    const found = users.find(u => u.username === username && u.password === password);
    if (found) {
      await AsyncStorage.setItem('loggedUser', JSON.stringify(found));
      setUser(found);
      return true;
    }
    return false;
  };

  const register = async (username, password) => {
    const data = await AsyncStorage.getItem('users');
    const users = data ? JSON.parse(data) : [];
    if (users.find(u => u.username === username)) return false;

    const newUser = { username, password };
    users.push(newUser);
    await AsyncStorage.setItem('users', JSON.stringify(users));
    await AsyncStorage.setItem('loggedUser', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const logout = async () => {
    await AsyncStorage.removeItem('loggedUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
