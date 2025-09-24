import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('default');

  const themes = {
    default: {
      primary: 'saffron.500',
      secondary: 'green.500',
      accent: 'india.500',
      bg: 'linear(to-br, india.50, white, green.100)',
    },
    southBlue: {
      primary: 'blue.500',
      secondary: 'teal.500',
      accent: 'navy.500',
      bg: 'linear(to-br, blue.50, white, teal.100)',
    },
    westernGreen: {
      primary: 'green.500',
      secondary: 'emerald.500',
      accent: 'forest.500',
      bg: 'linear(to-br, green.50, white, emerald.100)',
    },
    bengaliPink: {
      primary: 'pink.500',
      secondary: 'magenta.500',
      accent: 'crimson.500',
      bg: 'linear(to-br, pink.50, white, magenta.100)',
    },
  };

  const theme = themes[currentTheme];

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
