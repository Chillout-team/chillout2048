import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IProfileForm {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
}

interface Payload {
    data: IProfileForm;
    path: string;
}

export const AuthRequest = createAsyncThunk(
    "auth/AuthRequest",
    async function (payload: Payload, thunkApi) {
        const { data, path } = payload;
        try {
            const response = await axios.post(
                `https://ya-praktikum.tech/api/v2${path}`,
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
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
