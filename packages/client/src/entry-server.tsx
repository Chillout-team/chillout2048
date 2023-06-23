import { renderToString } from "react-dom/server";
import App from "./App";
import { StaticRouter } from "react-router-dom/server";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export const render = (url: string | Partial<Location>) => {
    renderToString(
        <StaticRouter location={url}>
            <Provider store={store}>
                <App />
            </Provider>
        </StaticRouter>,
    );
};
