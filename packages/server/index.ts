import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import cors from "cors";
import express, { Response } from "express";
import { postgreDBConnect } from "./db";
dotenv.config();


// @ts-ignore
import { render } from "../client/dist/ssr/entry-server.cjs";
import { apiRouter } from "./routes/apiRouter";
import { createProxyMiddleware } from "http-proxy-middleware";
import { YANDEX_API_URL } from "./consts/common";
import { checkAuth } from "./middlewares/checkAuth";
import { apiRepository } from "./repository/apiRepository";


const app = express();
app.use(cors());
app.use(express.json());

const port = Number(process.env.SERVER_PORT) || 3001;

postgreDBConnect();

app.use(
    "/api/v2",
    createProxyMiddleware({
        changeOrigin: true,
        cookieDomainRewrite: {
            "*": "",
        },
        target: YANDEX_API_URL,
    }),
);

app.use(express.urlencoded({ extended: true }));

app.use("/api", async (req, res, next) => {
    try {
        const isAuth =  await checkAuth(req);
        //const isAuth =  true
        if (!isAuth) {
            res.status(403).send({
                message: "User is not authorized",
            });
            return;
        } else {
        app.use(express.json());
        apiRouter(req, res, next);
        }
    } catch (e) {
        res.status(500).send({
            message: (e as Error).message || "API forum: something wrong.",
        });
    }
});

app.use(express.static(path.resolve(__dirname, "../client/dist/client")));

app.get("/", (req, res: Response) => {
    const result = render(req.url, apiRepository(req.headers['cookie']));
    const template = path.resolve(
        __dirname,
        "../client/dist/client/index.html",
    );
    const htmlString = fs.readFileSync(template, "utf-8");

    const store = {};
    const appStore = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
        store,
    )}</script>`;

    const newString = htmlString
        .replace("<!--ssr-outlet-->", result)
        .replace("<!--ssr-store-->", appStore);
    res.send(newString);
});

app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
