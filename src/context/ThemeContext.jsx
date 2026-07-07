import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Available color presets
  const colors = {
    trelloBlue: '#0079bf',
    charcoal: '#1d2125',
    sunsetOrange: '#d29034',
    forestGreen: '#519872',
    sunsetRed: '#eb5a46',
  };

  const [currentBg, setCurrentBg] = useState(colors.trelloBlue);

  return (
    <ThemeContext.Provider value={{ currentBg, setCurrentBg, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);