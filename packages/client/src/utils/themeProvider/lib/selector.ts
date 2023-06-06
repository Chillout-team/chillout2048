import { createSelector } from "@reduxjs/toolkit";
import { THEME } from "@/utils/themeProvider";
import { RootState } from "@/redux/store";

const getTheme = (state: RootState) => state.user?.theme?.theme || THEME.LIGHT;
const getUserId = (state: RootState) => state.user?.user?.id;

export default createSelector([getTheme, getUserId], (theme, userId) => ({
    theme,
    userId,
}));
