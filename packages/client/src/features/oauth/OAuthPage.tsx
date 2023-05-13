import { oAuth } from "@/api/oAuth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import cls from "./OAuthPage.module.scss";
import { ROUTES } from "@/router/routes";

export const OAuthPage = () => {
    const [loading, setLoading] = useState(true);
    const [authSuccessful, setAuthSuccessful] = useState(false);

    const cheackAuth = async () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get("code");

        if (!localStorage.getItem("auth") && code) {
            const res = await oAuth.takeToken(code);
            setLoading(false);
            if (res?.data === "OK") {
                setAuthSuccessful(true);
                localStorage.setItem("auth", "true");
            }
        } else if (localStorage.getItem("auth")) {
            setLoading(false);
            setAuthSuccessful(true);
        } else {
            setLoading(false);
            setAuthSuccessful(false);
        }
    };

    useEffect(() => {
        cheackAuth();
    }, []);

    return (
        <>
            {loading ? (
                <h2 className={cls.loading}>Загрузка</h2>
            ) : authSuccessful ? (
                <Navigate to={ROUTES.HOME.path} />
            ) : (
                <Navigate to={ROUTES.SINGIN.path} />
            )}
        </>
    );
};
