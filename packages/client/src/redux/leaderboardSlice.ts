import { AnyAction, AsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUser, getTeam } from "./actions/leaderboarAction";
import { ILeaderbordState } from "@/types/types";

const initialState: ILeaderbordState = {
    data: [],
    error: "",
    loadingStatus: "idle",
};

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;

const isPendingAction = (action: AnyAction): action is PendingAction => {
    return action.type.endsWith("/pending");
};

const isRejectedAction = (action: AnyAction): action is RejectedAction => {
    return action.type.endsWith("/rejected");
};

export const leaderboardSlice = createSlice({
    name: "leaderboar",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(addUser.fulfilled, (state, action) => {
                state.error = "";
                state.loadingStatus = "idle";
            })
            .addCase(getTeam.fulfilled, (state, action) => {
                state.error = "";
                state.loadingStatus = "idle";
                state.data = action.payload;
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

export default leaderboardSlice.reducer;
