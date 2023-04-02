import { useEffect } from "react";
import "./App.scss";
import { Authentication } from "./components/authentication/Authentication";

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
    return <Authentication mode={"reg"} />;
}

export default App;
