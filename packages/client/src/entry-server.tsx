import { renderToString } from "react-dom/server";
import App from "./App";
import { StaticRouter } from "react-router-dom/server";
import { Provider } from "react-redux";
import { Store, AnyAction } from "@reduxjs/toolkit";
// import { store } from "./redux/store";

export const render = (
    url: string | Partial<Location>,
    initStore: Store<unknown, AnyAction>,
) => {
    renderToString(
        <StaticRouter location={url}>
            <Provider store={initStore}>
                <App />
            </Provider>
        </StaticRouter>,
    );
};
