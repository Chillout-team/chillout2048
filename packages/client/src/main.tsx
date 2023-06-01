import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { createStore } from "./redux/store";
import { startServiceWorker } from "./utils/serviceWorker/ServiceWorkerRegister";
import { ThemeProvider } from "@/utils/themeProvider";
import { ApiService } from "./services/apiService";
import { authAPI } from "./api/auth-api";

const apiServices = new ApiService(authAPI);

const store = createStore(
    apiServices,
    typeof window !== "undefined" ? window.__PRELOADED_STATE__ : undefined,
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </Provider>
    </BrowserRouter>,
);

if (process.env.NODE_ENV === "production") {
    startServiceWorker();
}
