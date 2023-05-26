import dotenv from "dotenv";
import path from "path";
import fs from "fs";
dotenv.config();

import express, { Response } from "express";
import { createClientAndConnect } from "./db";

// @ts-ignore
import { render } from "../client/dist/ssr/entry-server.cjs";

const app = express();

const port = Number(process.env.SERVER_PORT) || 3001;

createClientAndConnect();

// test

const topics = [
    {
        topic_id: 1,
        title: "Test topic",
        user: {
            avatar: null,
            display_name: "Superuser",
            id: 877972,
            login: "Superuser",
        },
        lastMessage: "Текст последнего сообщения",
        lastMessageDate: "27.03.2023 13:30",
        emoji: [],
        messages: [
            {
                id: 1,
                message: "Test topic",
                user: {
                    avatar: null,
                    display_name: "Superuser",
                    id: 877972,
                    login: "Superuser",
                },
                emoji: [
                    {
                        content: "👍",
                        users: [1, 5],
                    },
                    {
                        content: "🔥",
                        users: [2],
                    },
                ],
            },
            {
                id: 2,
                message: "Test topic",
                user: {
                    avatar: null,
                    display_name: "Superuser",
                    id: 877972,
                    login: "Superuser",
                },
            },
        ],
    },
    {
        topic_id: 2,
        title: "Test topic",
        user: {
            avatar: null,
            display_name: "Superuser",
            id: 877972,
            login: "Superuser",
        },
        lastMessage: "Текст последнего сообщения",
        lastMessageDate: "27.03.2023 13:30",
        messages: [
            {
                id: 1,
                message: "Ребята, я на первом месте!",
                user: {
                    avatar: null,
                    display_name: "Superuser",
                    id: 877972,
                    login: "Superuser",
                },
            },
            {
                id: 2,
                message:
                    "Съешьте ещё этих мягких французских булок да выпейте же чаю.",
                user: {
                    avatar: null,
                    display_name: "Superuser",
                    id: 877972,
                    login: "Superuser",
                },
                emoji: [
                    {
                        content: "👍",
                        users: [1, 5],
                    },
                    {
                        content: "🔥",
                        users: [2],
                    },
                ],
            },
        ],
    },
];
app.get("/api/forum", (req, res: Response) => {
    console.log(req.route);
    const answer = topics.map(({ messages, ...other }) => {
        return { messagesCount: messages.length, ...other };
    });
    res.status(200).send(JSON.stringify(answer));
});

app.get("/api/forum/topic/:id", (req, res: Response) => {
    console.log(req.route);
    const { id } = req.params;
    const topic = topics.filter(({ topic_id }) => topic_id === Number(id));
    res.status(200).send(JSON.stringify(topic[0]));
});

// test

app.use(express.static(path.resolve(__dirname, "../client/dist/client")));

app.get("/", (req, res: Response) => {
    const result = render(req.url);
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
