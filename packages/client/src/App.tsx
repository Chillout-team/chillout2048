// import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Profile } from "./components/profile/Profile";
import { Authentication } from "./components/authentication/Authentication";

function App() {
    // useEffect(() => {
    //     const fetchServerData = async () => {
    //         const url = `http://localhost:${__SERVER_PORT__}`;
    //         const response = await fetch(url);
    //         const data = await response.json();
    //         console.log(data);
    //     };
    //     fetchServerData();
    // }, []);

    return (
        <Routes>
            <Route path="/" />
            <Route path="/profile" element={<Profile />} />
            <Route path="/singin" element={<Authentication mode="auth" />} />
            <Route path="/singup" element={<Authentication mode="reg" />} />
        </Routes>
    );
}

export default App;
