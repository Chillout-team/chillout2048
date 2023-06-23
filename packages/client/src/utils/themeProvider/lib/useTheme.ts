import { THEME } from "../lib/ThemeContext";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import selector from "./selector";
import { setTheme } from "@/redux/actions/authAction";

interface IUseThemeResult {
    toggleTheme: () => void;
    theme: string;
}

export const useTheme = (): IUseThemeResult => {
    const dispatch = useAppDispatch();

    const { theme, userId } = useAppSelector(selector);
    const toggleTheme = () => {
        if (theme && userId) {
            const newTheme = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;

            dispatch(setTheme({ userId, theme: newTheme, themeId: 1 }));
        }
    };

    return { theme: theme, toggleTheme };
};
