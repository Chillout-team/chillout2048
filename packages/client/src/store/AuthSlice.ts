import { AuthRequest } from "@/api/auth-api";
import { createSlice } from "@reduxjs/toolkit";

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

export default ApiSlice.reducer;
