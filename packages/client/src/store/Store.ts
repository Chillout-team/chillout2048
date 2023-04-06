import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
    reducer: AuthSlice,
});

type AppDispatch = typeof store.dispatch;
export const useAuthDispatch: () => AppDispatch = useDispatch;
export default store;
