import { IUserState } from "@/types/types";
import { AnyAction, AsyncThunk, createSlice } from "@reduxjs/toolkit";
import noPic from "@/assets/img/no-pic.svg";
import { getUser, logout, setTheme } from "./actions/authAction";
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
    theme: null,
    error: "",
    loadingStatus: "idle",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;

const isPendingAction = (action: AnyAction): action is PendingAction => {
    return action.type.endsWith("/pending");
};

const isRejectedAction = (action: AnyAction): action is RejectedAction => {
    return action.type.endsWith("/rejected");
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.error = "";
                state.loadingStatus = "idle";
                state.user = {
                    ...action.payload,
                    avatar: action.payload.avatar
                        ? `${YANDEX_API_URL}resources${action.payload.avatar}`
                        : initialState.user?.avatar,
                };
                state.theme = action.payload.theme;
            })
            .addCase(setTheme.fulfilled, (state, action) => {
                state.theme = {
                    id: action.meta.arg.userId,
                    theme: action.meta.arg.theme,
                    themeId: action.meta.arg.themeId,
                };
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.error = "";
                state.loadingStatus = "idle";
                state.user = action.payload;
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
            .addCase(changePassword.fulfilled, state => {
                state.error = "";
                state.loadingStatus = "idle";
            })
            .addMatcher(isPendingAction, state => {
                state.error = "";
                state.loadingStatus = "loading";
            })
            .addMatcher(isRejectedAction, (state, action) => {
                state.loadingStatus = "failed";
                state.error = action.payload as string;
            });
    },
});

export default userSlice.reducer;
