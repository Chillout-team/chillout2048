import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Profile } from "./components/profile/Profile";
import { getUser } from "./controllers/authController";

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
            <Route path="/" />
            <Route path="/profile" element={<Profile {...appState.user} />} />
        </Routes>
    );
}

export default App;
