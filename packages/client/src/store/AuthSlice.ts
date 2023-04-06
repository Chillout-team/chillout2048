import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { YANDEX_API_URL } from "@/consts/common";

interface IProfileForm {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
}

interface IPayload {
    data: IProfileForm;
    path: string;
}

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

const ApiSlice = createSlice({
    name: "auth",
    initialState: {},
    reducers: {},
    extraReducers(builder) {
        builder.addCase(AuthRequest.fulfilled, (state, action) => {
            console.log(action);
        });
        builder.addCase(AuthRequest.rejected, (state, action) => {
            console.log(action);
        });
    },
});

// export const {} = catalogSlice.actions;

export default ApiSlice.reducer;
