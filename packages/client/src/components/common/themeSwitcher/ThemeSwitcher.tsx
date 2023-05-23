import React, { FC } from "react";
import { IconButton } from "@/components/common/iconButton/IconButton";
import { THEME, useTheme } from "@/utils/themeProvider";
import moonPic from "@/assets/img/moon.svg";
import sunPic from "@/assets/img/sun.svg";

const getIcon = (theme: THEME): string => {
    switch (theme) {
        case THEME.DARK:
            return moonPic;
        case THEME.LIGHT:
            return sunPic;
        default:
            return "";
    }
};

interface IProps {
    className?: string;
}

export const ThemeSwitcher: FC<IProps> = ({ className }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <IconButton className={className} onClick={toggleTheme}>
            <img src={getIcon(theme)} alt="ThemeIcon" width="34" height="34" />
        </IconButton>
    );
};
