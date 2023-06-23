import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { startServiceWorker } from "./utils/serviceWorker/ServiceWorkerRegister";
import { ThemeProvider } from "@/utils/themeProvider";

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
