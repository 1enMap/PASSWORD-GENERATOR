"use client";

import { useState, useEffect } from "react";

interface PasswordEntry {
  password: string;
  timestamp: number;
}

export function usePasswordStorage() {
  const [history, setHistory] = useState<PasswordEntry[]>([]);
  const [favorites, setFavorites] = useState<PasswordEntry[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("passwordHistory");
    const savedFavorites = localStorage.getItem("passwordFavorites");
    
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  const addToHistory = (password: string) => {
    const newEntry = { password, timestamp: Date.now() };
    const updatedHistory = [newEntry, ...history.slice(0, 9)];
    setHistory(updatedHistory);
    localStorage.setItem("passwordHistory", JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("passwordHistory");
  };

  const addToFavorites = (password: string) => {
    if (!password) return;
    if (favorites.some(entry => entry.password === password)) {
      return;
    }
    const newEntry = { password, timestamp: Date.now() };
    const updatedFavorites = [newEntry, ...favorites];
    setFavorites(updatedFavorites);
    localStorage.setItem("passwordFavorites", JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (password: string) => {
    const updatedFavorites = favorites.filter(entry => entry.password !== password);
    setFavorites(updatedFavorites);
    localStorage.setItem("passwordFavorites", JSON.stringify(updatedFavorites));
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("passwordFavorites");
  };

  return {
    history,
    favorites,
    addToHistory,
    clearHistory,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
  };
}