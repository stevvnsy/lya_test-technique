import {createContext, type ReactNode, useContext, useEffect, useMemo, useState,} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
    theme: Theme;
    isDark: boolean;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = "app-theme";

function applyTheme(theme: Theme) {
    const root = document.documentElement;

    if (theme === "dark") {
        root.classList.add("dark");
    } else {
        root.classList.remove("dark");
    }
}

function getInitialTheme(): Theme {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({children}: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>("light");

    useEffect(() => {
        const initialTheme = getInitialTheme();
        setThemeState(initialTheme);
        applyTheme(initialTheme);
    }, []);

    const setTheme = (value: Theme) => {
        setThemeState(value);
        localStorage.setItem(THEME_STORAGE_KEY, value);
        applyTheme(value);
    };

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const value = useMemo(
        () => ({
            theme,
            isDark: theme === "dark",
            toggleTheme,
            setTheme,
        }),
        [theme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }

    return context;
}