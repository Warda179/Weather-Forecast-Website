// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (raw) setUser(JSON.parse(raw));
  }, []);

  function login({ email }) {
    const u = { email, token: 'mock-token' };
    localStorage.setItem('user', JSON.stringify(u));
    setUser(u);
  }

  function register({ email }) {
    const u = { email, token: 'mock-token' };
    localStorage.setItem('user', JSON.stringify(u));
    setUser(u);
  }

  function logout() {
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
