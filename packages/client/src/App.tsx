import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Profile } from "./features/profile/Profile";
import { Authentication } from "./features/authentication/Authentication";

function App() {
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
