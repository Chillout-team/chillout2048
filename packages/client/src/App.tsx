import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
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
                <Route path="/" />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    );
}

export default App;
