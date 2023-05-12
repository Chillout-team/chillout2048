import { baseAPI } from "./api";

const REDIRECT_URI = "http://localhost:3000/oauth";

export const oAuth = {
    singin: async () => {
        const res = await baseAPI.get(
            `/oauth/yandex/service-id?redirect_uri=${REDIRECT_URI}`,
        );
        const { service_id } = res.data;
        const URL = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${REDIRECT_URI}`;
        window.location.href = URL;
    },

    takeToken: async (code: string) => {
        const data = {
            code: code,
            redirect_uri: REDIRECT_URI,
        };
        const res = await baseAPI.post(`/oauth/yandex`, JSON.stringify(data));
        return res;
    },
};
