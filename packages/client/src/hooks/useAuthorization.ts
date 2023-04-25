import { getUser, logout } from "@/redux/actions/authAction";
import { useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { IUserData } from "@/types/types";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export const useAuthorization = () => {
    const userData: Partial<IUserData> = useSelector((state: RootState) => state.user?.user) || {};
    const isAuthorized = !!userData.id;

    const dispatch = useAppDispatch();

    const initRef = useRef(false);

    useEffect(() => {
        if (!initRef.current && userData.id === null) {
            dispatch(getUser());
            initRef.current = true;
        }
    }, [userData, initRef, dispatch]);

    const handleLogout = () => dispatch(logout());

    return { userData, isAuthorized, handleLogout };
}
