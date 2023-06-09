import { Emoji, IUserData } from "@/types/types";
import axios from "axios";

const URL = `http://localhost:${3000}/api`;

const baseAPI = axios.create({
    withCredentials: true,
    baseURL: URL,
    headers: {
        "Access-Control-Allow-Methods": "GET, POST, PUT",
        "Access-Control-Allow-Headers": "content-type",
        "Content-Type": "application/json",
    },
});

type SendMessageData = {
    topic_id: string;
    message: string;
    user: IUserData;
};

type CreateNewTopic = {
    name: string;
    user: IUserData;
};

type UpdateEmoji = {
    emoji: string;
    topic_id: string;
    message_id: string;
    user_id: number;
};

export const forumAPI = {
    loadTopicList: async () => {
        try {
            const res = await baseAPI.get(`/forum`);
            return res.data;
        } catch (error) {
            throw new Error(`error: ${error}`);
        }
    },

    loadTopic: async (id: number | string) => {
        try {
            const res = await baseAPI.get(`/forum/topic/${id}`);
            return res.data;
        } catch (error) {
            throw new Error(`error: ${error}`);
        }
    },

    sendMessage: async (data: SendMessageData) => {
        try {
            const res = await baseAPI.post(`/forum/message`, {
                ...data,
            });
            return res.data;
        } catch (error) {
            throw new Error(`error: ${error}`);
        }
    },

    createNewTopic: async (data: CreateNewTopic) => {
        try {
            const res = await baseAPI.post(`/forum/topic`, {
                ...data,
            });
            return res.data;
        } catch (error) {
            throw new Error(`error: ${error}`);
        }
    },

    updateEmoji: async (data: UpdateEmoji): Promise<Emoji[]> => {
        try {
            const res = await baseAPI.post(`/forum/message/emoji`, {
                ...data,
            });
            return res.data;
        } catch (error) {
            throw new Error(`error: ${error}`);
            return [];
        }
    },
};
