import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import leaderboardReducer from "./leaderboardSlice";

const RootReducers = combineReducers({
    user: userReducer,
    leaderboard: leaderboardReducer,
});

export const store = configureStore({
    reducer: RootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
