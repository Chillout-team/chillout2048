import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const RootReducers = combineReducers({
    user: userReducer,
});

export const store = configureStore({
    reducer: RootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
