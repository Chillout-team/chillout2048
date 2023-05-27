import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import cors from "cors";
dotenv.config();

import express, { Response } from "express";
import { createClientAndConnect } from "./db";

// @ts-ignore
import { render } from "../client/dist/ssr/entry-server.cjs";

const app = express();

const port = Number(process.env.SERVER_PORT) || 3001;

createClientAndConnect();
app.use(express.json());
app.use(cors());

// test

const topics = [
    {
        topic_id: 1,
        title: "Topic 1",
        messageDate: "27.03.2023 13:30",
        user: {
            avatar: null,
            display_name: "Superuser",
            id: 877972,
            login: "Superuser",
        },
        lastMessage: "Текст последнего сообщения",
        lastMessageDate: "27.03.2023 13:30",
        emojis: [],
        messages: [
            {
                id: 1,
                message: "Test topic",
                messageDate: "27.03.2023 13:30",
                user: {
                    avatar: null,
                    display_name: "Superuser",
                    id: 877972,
                    login: "Superuser",
                },
                emojis: [
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
                messageDate: "27.03.2023 13:30",
                user: {
                    avatar: null,
                    display_name: "Superuser",
                    id: 877972,
                    login: "Superuser",
                },
                emojis: [],
            },
        ],
    },
    {
        topic_id: 2,
        title: "Topic 2",
        messageDate: "27.03.2023 13:30",
        user: {
            avatar: null,
            display_name: "Superuser",
            id: 877972,
            login: "Superuser",
        },
        lastMessage: "Текст последнего сообщения",
        lastMessageDate: "27.03.2023 13:30",
        emojis: [],
        messages: [
            {
                id: 1,
                message: "Ребята, я на первом месте!",
                messageDate: "27.03.2023 13:30",
                user: {
                    avatar: null,
                    display_name: "Superuser",
                    id: 877972,
                    login: "Superuser",
                },
                emojis: [],
            },
            {
                id: 2,
                message:
                    "Съешьте ещё этих мягких французских булок да выпейте же чаю.",
                messageDate: "27.03.2023 13:30",
                user: {
                    avatar: null,
                    display_name: "Superuser",
                    id: 877972,
                    login: "Superuser",
                },
                emojis: [
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

app.get("/api/forum", (_, res: Response) => {
    const answer = topics.map(({ messages, ...other }) => {
        return { messagesCount: messages.length, ...other };
    });
    res.send(answer);
});

app.get("/api/forum/topic/:id", (req, res: Response) => {
    const { id } = req.params;
    const topic = topics.filter(({ topic_id }) => topic_id === Number(id));
    res.send(JSON.stringify(topic[0]));
});

app.post("/api/forum/message", (req, res: Response) => {
    const { topic_id, message, user } = req.body;
    const targetTopic = topics.find(
        topic => topic.topic_id === Number(topic_id),
    );
    if (targetTopic) {
        targetTopic.messages.push({
            id: targetTopic.messages.length + 1,
            message: message,
            messageDate: Date(),
            user: user,
            emojis: [],
        });
        res.send("OK");
    }
});

app.post("/api/forum/topic", (req, res: Response) => {
    const { message, user } = req.body;
    topics.push({
        topic_id: topics.length + 1,
        title: message,
        messageDate: Date(),
        user: user,
        lastMessage: message,
        lastMessageDate: Date(),
        emojis: [],
        messages: [
            {
                id: 0,
                message: message,
                messageDate: Date(),
                user: user,
                emojis: [],
            },
        ],
    });
    res.send("OK");
});

type ReqParams = {
    topic_id: number;
    message_id: number;
    content: string;
    userId: number;
};

app.put("/api/forum/message/emoji", (req, res: Response) => {
    const reqParams: ReqParams = req.body;
    const { topic_id, message_id, content, userId } = reqParams;
    const targetTopic = topics.find(
        topic => topic.topic_id === Number(topic_id),
    );
    if (targetTopic && userId) {
        const targetMessage = targetTopic?.messages.find(
            message => message.id === message_id,
        );
        if (targetMessage) {
            const targetEmoji = targetMessage.emojis.find(
                emoji => emoji.content === content,
            );
            if (targetEmoji) {
                const userFoundById = targetEmoji.users.findIndex(
                    targetUserId => targetUserId === userId,
                );
                if (userFoundById >= 0) {
                    targetEmoji.users.splice(userFoundById, 1);
                } else {
                    targetEmoji.users.push(userId);
                }
            } else {
                targetMessage.emojis.push({
                    content: content,
                    users: [userId],
                });
            }
            res.send(targetMessage.emojis);
        }
    }
    res.send();
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
