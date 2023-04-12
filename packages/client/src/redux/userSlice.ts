import { IUserState } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import noPic from "@/assets/img/no-pic.svg";
import { getUser, logout } from "./actions/authAction";
import { YANDEX_API_URL } from "@/consts/common";
import {
    changeAvatar,
    changePassword,
    changeProfile,
} from "./actions/userAction";

const initialState: IUserState = {
    user: {
        id: null,
        email: "",
        login: "",
        first_name: "",
        second_name: "",
        display_name: "",
        phone: "",
        password: "",
        avatar: noPic,
    },
    error: "",
    loadingStatus: "idle",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getUser.pending, state => {
                state.error = "";
                state.loadingStatus = "loading";
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.error = "";
                state.loadingStatus = "idle";
                state.user = {
                    ...action.payload,
                    avatar: action.payload.avatar
                        ? `${YANDEX_API_URL}resources${action.payload.avatar}`
                        : initialState.user?.avatar,
                };
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loadingStatus = "failed";
                state.error = action.payload as string;
            })
            .addCase(logout.pending, state => {
                state.error = "";
                state.loadingStatus = "loading";
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.error = "";
                state.loadingStatus = "idle";
                state.user = action.payload;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loadingStatus = "failed";
                state.error = action.payload as string;
            })
            .addCase(changeAvatar.pending, state => {
                state.error = "";
                state.loadingStatus = "loading";
            })
            .addCase(changeAvatar.fulfilled, (state, action) => {
                state.error = "";
                state.loadingStatus = "idle";
                state.user = {
                    ...action.payload,
                    avatar: action.payload.avatar
                        ? `${YANDEX_API_URL}resources${action.payload.avatar}`
                        : initialState.user?.avatar,
                };
            })
            .addCase(changeAvatar.rejected, (state, action) => {
                state.loadingStatus = "failed";
                state.error = action.payload as string;
            })
            .addCase(changeProfile.pending, state => {
                state.error = "";
                state.loadingStatus = "loading";
            })
            .addCase(changeProfile.fulfilled, (state, action) => {
                state.error = "";
                state.loadingStatus = "idle";
                state.user = {
                    ...action.payload,
                    avatar: action.payload.avatar
                        ? `${YANDEX_API_URL}resources${action.payload.avatar}`
                        : initialState.user?.avatar,
                };
            })
            .addCase(changeProfile.rejected, (state, action) => {
                state.loadingStatus = "failed";
                state.error = action.payload as string;
            })
            .addCase(changePassword.pending, state => {
                state.error = "";
                state.loadingStatus = "loading";
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.error = "";
                state.loadingStatus = "idle";
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loadingStatus = "failed";
                state.error = action.payload as string;
            });
    },
});

export default userSlice.reducer;
