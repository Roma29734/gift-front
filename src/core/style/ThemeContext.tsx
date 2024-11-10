import React, { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme } from './themes';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: {
        background: string;
        accentBg: string;
        tTitle: string;
        tSecond: string;
        primary: string;
        secondary: string;
        text: string;
        navB: string;
        swBtn: string;
        swBtnSelected: string;
        item: string;
        modalBg: string;
        btnClose: string;
        tableBg: string;
    };
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('light');

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const currentTheme = theme === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProviderComponent');
    }
    return context;
};