import { authAPI } from "@/api/auth-api";
import { deleteCookie } from "@/utils/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { themeAPI } from "@/api/theme-api";

export const getUser = createAsyncThunk(
    "user/getuser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await authAPI.user();

            const theme = await themeAPI.getTheme({ id: response.data.id });

            return { ...response.data, theme };
        } catch (error) {
            return rejectWithValue(
                `Ошибка получения данных пользователя: ${
                    (error as Error).message
                }`,
            );
        }
    },
);

export const setTheme = createAsyncThunk(
    "user/setTheme",
    async (
        data: { userId: number; theme: string; themeId: number },
        { rejectWithValue },
    ) => {
        try {
            const response = await themeAPI.updateTheme({
                id: data.userId,
                theme: data.theme,
                themeId: data.themeId,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                `Ошибка получения темы: ${(error as Error).message}`,
            );
        }
    },
);

export const logout = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            await authAPI.logout();
            deleteCookie("authCookie");
            deleteCookie("uuid");
            return null;
        } catch (error) {
            return rejectWithValue(
                `Ошибка logout: ${(error as Error).message}`,
            );
        }
    },
);
