import React, { createContext, useState } from "react";
import { lightTheme, darkTheme } from "../colors.js";

const defaultContextValue = {
  theme: lightTheme,
  isDarkMode: false,
};

export const ThemeContext = createContext(defaultContextValue);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
