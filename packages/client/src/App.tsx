import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Profile } from "./features/profile/Profile";
import { getUser } from "./controllers/authController";
import { ROUTES } from "./router/routes";
import { Authentication } from "./features/authentication/Authentication";
import { Forum } from "./features/forum/Forum";

import "./App.scss";
import Home from "./components/home/Home";

function App() {
    const [appState, setAppState] = useState({
        isAuth: false,
        user: {
            email: "",
            login: "",
            first_name: "",
            second_name: "",
            display_name: "",
            phone: "",
        },
    });

    useEffect(() => {
        getUser().then(data => {
            setAppState({
                isAuth: true,
                user: data,
            });
        });
    }, [setAppState]);

    return (
        <Routes>
            <Route path={ROUTES.HOME.path} element={<Home />} />
            <Route
                path={ROUTES.SINGIN.path}
                element={<Authentication mode={"auth"} />}
            />
            <Route
                path={ROUTES.SINGUP.path}
                element={<Authentication mode={"reg"} />}
            />
            <Route
                path={ROUTES.PROFILE.path}
                element={<Profile {...appState.user} />}
            />
            <Route
                path={ROUTES.PROFILE.path}
                element={<Profile {...appState.user} />}
            />
            <Route path={ROUTES.FORUM.TOPIC.path} element={<Forum />} />
            <Route path={ROUTES.FORUM.path} element={<Forum />} />
        </Routes>
    );
}

export default App;
