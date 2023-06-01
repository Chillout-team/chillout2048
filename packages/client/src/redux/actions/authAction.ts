import { authAPI } from "@/api/auth-api";
import { deleteCookie } from "@/utils/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
//import { IServices } from "../store";

export const getUser = createAsyncThunk(
    "user/getuser",
    async (_, { rejectWithValue, extra }) => {
        try {
            const service = extra as any;//IServices;
            const data = await service.getUser();
            //const response = await authAPI.user();
            //return response.data;
            return data;
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
    async (_, { rejectWithValue, extra }) => {
        try {
            const service = extra as any;//IServices;
            await service.logout();
            //await authAPI.logout();
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
