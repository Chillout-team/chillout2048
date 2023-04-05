import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Authentication } from "./components/authentication/Authentication";
import { ErrorPage } from "./components/common/errorPage/ErrorPage";
import { Forum } from "./components/forum/Forum";
import { Game } from "./components/game/Game";
import { Home } from "./components/home/Home";
import { Leaderboard } from "./components/leaderboard/Leaderboard";
import { Profile } from "./components/profile/Profile";

function App() {
    useEffect(() => {
        const fetchServerData = async () => {
            const url = `http://localhost:${__SERVER_PORT__}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
        };

        fetchServerData();
    }, []);
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/singin" element={<Authentication />} />
                <Route path="/singup" element={<Authentication />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/forum/:id" element={<Forum />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/game" element={<Game />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                //TODO Если страницы не найдена, то открывает 404 по адресу /*
                <Route path="/500" element={<ErrorPage />} />
                <Route path="/*" element={<ErrorPage />} />
            </Routes>
        </div>
    );
}

export default App;
