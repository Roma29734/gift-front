import React, { createContext, useContext, useState, useEffect } from 'react';
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
    getCurrentTheme: () => Theme; // Метод для получения текущей темы
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        // Проверка локального хранилища или системной темы при первой загрузке
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (savedTheme) {
            return savedTheme;
        }
        // Используем системную тему, если нет сохраненной
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        // Сохраняем текущую тему в localStorage при изменении
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const getCurrentTheme = (): Theme => {
        return theme;
    };

    const currentTheme = theme === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme, getCurrentTheme }}>
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
