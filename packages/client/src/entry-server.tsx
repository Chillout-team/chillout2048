import { renderToString } from "react-dom/server";
import App from "./App";
import { StaticRouter } from "react-router-dom/server";
import { Provider } from "react-redux";
import { ApiService } from "./services/apiService";
import { createStore } from "./redux/store";
//import { store } from "./redux/store";

export const render = (url: string | Partial<Location>, repository: any) => {
    const apiServices = new ApiService(repository);
    
    const store = createStore(
        apiServices,
        typeof window !== "undefined" ? window.__PRELOADED_STATE__ : undefined,
    );

    return renderToString(
        <StaticRouter location={url}>
            <Provider store={store}>
                <App />
            </Provider>
        </StaticRouter>,
    );
};
