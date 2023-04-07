import { YANDEX_API_URL } from "@/consts/common";
import { baseAPI } from "./api";
import { IUserData } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IPayload {
    data: IUserData;
    path: string;
}

export const authAPI = {
    async user() {
        const response = await baseAPI.get(`/auth/user`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    },
};

export const AuthRequest = createAsyncThunk(
    "auth/AuthRequest",
    async function (payload: IPayload, thunkApi) {
        const { data, path } = payload;
        try {
            const response = await axios.post(
                `${YANDEX_API_URL}${path}`,
                data,
                {
                    headers: {
                        "content-type": "application/json",
                        "Access-Control-Allow-Methods": "GET, POST, PUT",
                        "Access-Control-Allow-Headers": "content-type",
                    },
                    withCredentials: true,
                },
            );
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                return thunkApi.rejectWithValue(error.message);
            }
        }
    },
);
