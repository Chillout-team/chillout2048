import { userAPI } from "@/api/user-api";
import { TIndexed } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const changeAvatar = createAsyncThunk(
    "user/changeAvatar",
    async (data: FormData, { rejectWithValue }) => {
        try {
            const response = await userAPI.changeAvatar(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                `Ошибка загрузки аватара: ${(error as Error).message}`,
            );
        }
    },
);

export const changeProfile = createAsyncThunk(
    "user/changeProfile",
    async (data: TIndexed, { rejectWithValue }) => {
        try {
            const response = await userAPI.changeProfile(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                `Ошибка обновления данных пользователя: ${
                    (error as Error).message
                }`,
            );
        }
    },
);

export const changePassword = createAsyncThunk(
    "user/changePassword",
    async (data: TIndexed, { rejectWithValue }) => {
        try {
            const response = await userAPI.changePassword(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                `Ошибка обновления пароля пользователя: ${
                    (error as Error).message
                }`,
            );
        }
    },
);
