import axios from "axios";

const URL = "http://localhost:3001/api";

const baseAPI = axios.create({
    baseURL: URL,
    withCredentials: true,
    timeout: 5000,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

export const forumAPI = {
    topics: async () => {
        try {
            const res = await baseAPI.get(`/forum`);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    topic: async (id: number | string) => {
        try {
            const res = await baseAPI.get(`/forum/topic/${id}`);
            return res;
        } catch (error) {
            console.log(error);
        }
    },
};
