import { createContext, useContext, useState } from "react";

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')
    const toggleTheme = () => {
        if (theme === 'light') setTheme('dark')
        else setTheme('light')
    }
    const contextValue = {
        theme,
        toggleTheme
    }
    return (
        <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);
