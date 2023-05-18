import { useContext } from "react";
import {
    LOCAL_STORAGE_THEME_KEY,
    THEME,
    ThemeContext,
} from "../lib/ThemeContext";

interface IUseThemeResult {
    toggleTheme: () => void;
    theme: THEME;
}

export function useTheme(): IUseThemeResult {
    const { theme = THEME.LIGHT, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        if (theme && setTheme) {
            const newTheme = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
            setTheme(newTheme);
            localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
        }
    };

    return { theme, toggleTheme };
}
