import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./routes";

export const PrivatRouters = () => {
    const isAuth = localStorage.getItem("auth");
    return isAuth !== null ? <Outlet /> : <Navigate to={ROUTES.SINGIN.path} />;
};
