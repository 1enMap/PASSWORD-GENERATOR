'use client';

import { useState, useEffect } from 'react';
import { Password, PasswordState, PasswordOptions } from '@/lib/types';
import { generatePassword, calculateStrength } from '@/lib/password';

const DEFAULT_OPTIONS: PasswordOptions = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  special: true,
  excludeSimilar: false,
  customCharacters: '',
};

const INITIAL_STATE: PasswordState = {
  history: [],
  favorites: [],
  options: DEFAULT_OPTIONS,
};

export function usePasswordState() {
  const [state, setState] = useState<PasswordState>(INITIAL_STATE);
  const [currentPassword, setCurrentPassword] = useState<Password | null>(null);

  useEffect(() => {
    const savedState = localStorage.getItem('passwordState');
    if (savedState) {
      setState(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('passwordState', JSON.stringify(state));
  }, [state]);

  const generateNewPassword = () => {
    const value = generatePassword(state.options);
    const password: Password = {
      id: crypto.randomUUID(),
      value,
      timestamp: Date.now(),
      strength: calculateStrength(value),
    };
    
    setCurrentPassword(password);
    setState(prev => ({
      ...prev,
      history: [password, ...prev.history].slice(0, 10),
    }));
  };

  const toggleFavorite = (password: Password) => {
    setState(prev => {
      const isFavorite = prev.favorites.some(p => p.id === password.id);
      return {
        ...prev,
        favorites: isFavorite
          ? prev.favorites.filter(p => p.id !== password.id)
          : [...prev.favorites, password],
      };
    });
  };

  const clearHistory = () => {
    setState(prev => ({ ...prev, history: [] }));
  };

  const clearFavorites = () => {
    setState(prev => ({ ...prev, favorites: [] }));
  };

  const updateOptions = (options: Partial<PasswordOptions>) => {
    setState(prev => ({
      ...prev,
      options: { ...prev.options, ...options },
    }));
  };

  return {
    state,
    currentPassword,
    generateNewPassword,
    toggleFavorite,
    clearHistory,
    clearFavorites,
    updateOptions,
  };
}