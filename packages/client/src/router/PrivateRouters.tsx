// import { Navigate, Outlet } from "react-router-dom";
// import { ROUTES } from "./routes";
import { Outlet } from "react-router-dom";

export const PrivateRouters = () => {
    // const isAuth = !localStorage ? null : localStorage.getItem("auth");
    // return isAuth !== null ? <Outlet /> : <Navigate to={ROUTES.SINGIN.path} />;
    return <Outlet />;
};
