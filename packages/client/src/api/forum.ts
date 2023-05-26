import axios from "axios";

const URL = "http://localhost:3001/api";

const baseAPI = axios.create({
    baseURL: URL,
    withCredentials: true,
    timeout: 5000,
    headers: {
        "Access-Control-Allow-Methods": "GET, POST, PUT",
        "Access-Control-Allow-Headers": "content-type",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": URL,
    },
});

export const authAPI = {
    async topics() {
        return await baseAPI.get(`/forum`);
    },
    async topic(id: number) {
        return await baseAPI.get(`/forum/topic/${id}`);
    },
};
