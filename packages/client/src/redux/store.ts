import { PreloadedState, combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import leaderboardReducer from "./leaderboardSlice";

const rootReducer = combineReducers({
    user: userReducer,
    leaderboard: leaderboardReducer,
});

export const createStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
};

export const store = createStore(
    typeof window !== 'undefined' ? window.__PRELOADED_STATE__ : undefined,
);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
