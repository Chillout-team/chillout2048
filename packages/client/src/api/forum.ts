import { Emoji, IUserData } from "@/types/types";
import axios from "axios";

const URL = "http://localhost:3001/api";

const baseAPI = axios.create({
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
    message: string;
    user: IUserData;
};

type UpdateEmoji = {
    content: string;
    topic_id: string;
    message_id: string;
    userId: number;
};

export const forumAPI = {
    loadTopicList: async () => {
        try {
            const res = await baseAPI.get(`/forum`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },

    loadTopic: async (id: number | string) => {
        try {
            const res = await baseAPI.get(`/forum/topic/${id}`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },

    sendMessage: async (data: SendMessageData) => {
        try {
            const res = await baseAPI.post(`/forum/message`, {
                ...data,
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },

    createNewTopic: async (data: CreateNewTopic) => {
        try {
            const res = await baseAPI.post(`/forum/topic`, {
                ...data,
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },

    updateEmoji: async (data: UpdateEmoji): Promise<Emoji[]> => {
        try {
            const res = await baseAPI.put(`/forum/message/emoji`, {
                ...data,
            });
            return res.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
};
