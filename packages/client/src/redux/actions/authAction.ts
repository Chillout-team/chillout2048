import { authAPI } from "@/api/auth-api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
    "user/getuser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await authAPI.user();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                `Ошибка получения данных пользователя: ${
                    (error as Error).message
                }`,
            );
        }
    },
);

export const logout = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            await authAPI.logout();
            return null;
        } catch (error) {
            return rejectWithValue(
                `Ошибка logout: ${(error as Error).message}`,
            );
        }
    },
);
