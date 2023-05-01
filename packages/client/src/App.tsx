import { Route, Routes } from "react-router-dom";
import { Profile } from "./features/profile/Profile";
import { ROUTES } from "./router/routes";
import { Authentication } from "./features/authentication/Authentication";
import { Leaderboard } from "./features/leaderboard/Leaderboard";
import { Forum } from "./features/forum/Forum";
import { ErrorPage } from "./features/errorPage/ErrorPage";
import { Game } from "./features/game/Game";
import { Home } from "./features/home/Home";
import { PrivatRouters } from "./router/PrivatRouters";

function App() {
    return (
        <Routes>
            <Route element={<PrivatRouters />}>
                <Route path={ROUTES.PROFILE.path} element={<Profile />} />
                <Route
                    path={ROUTES.LEADERBOARD.path}
                    element={<Leaderboard />}
                />
                <Route path={ROUTES.FORUM.TOPIC.path} element={<Forum />} />
                <Route path={ROUTES.FORUM.path} element={<Forum />} />
            </Route>

            <Route path={ROUTES.HOME.path} element={<Home />} />
            <Route
                path={ROUTES.SINGIN.path}
                element={<Authentication mode={"auth"} />}
            />
            <Route
                path={ROUTES.SINGUP.path}
                element={<Authentication mode={"reg"} />}
            />
            <Route path={ROUTES.GAME.path} element={<Game />} />
            <Route
                path={ROUTES.ERROR_PAGE.path}
                element={<ErrorPage type="500" />}
            />
            <Route path="*" element={<ErrorPage type="404" />} />
        </Routes>
    );
}

export default App;
