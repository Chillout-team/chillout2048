import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";

const store = configureStore({
    reducer: AuthSlice,
});

export type AppDispatch = typeof store.dispatch;
export default store;
