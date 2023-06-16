import axios from "axios";

const URL = "http://localhost:3000/api";

const baseAPI = axios.create({
    withCredentials: true,
    baseURL: URL,
    headers: {
        "Access-Control-Allow-Methods": "GET, POST, PUT",
        "Access-Control-Allow-Headers": "content-type",
        "Content-Type": "application/json",
    },
});

export const themeAPI = {
    getTheme: async (data: { id: number }) => {
        try {
            const res = await baseAPI.get(`/theme/${data.id}`);
            return res.data;
        } catch (error) {
            throw new Error(`error: ${error}`);
        }
    },

    updateTheme: async (data: {
        id: number;
        theme: string;
        themeId: number;
    }) => {
        try {
            const res = await baseAPI.post(`/theme/${data.id}`, {
                theme: data.theme,
                themeId: data.themeId,
            });
            return res.data;
        } catch (error) {
            throw new Error(`error: ${error}`);
        }
    },
};
