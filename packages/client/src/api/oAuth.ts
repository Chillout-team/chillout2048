// import axios from "axios";
import { baseAPI } from "./api";
// import { authAPI } from "./auth-api";

const REDIRECT_URI = "http://127.0.0.1:3000/singin";
const CLIENT_ID = "55df389da6b643ca8e2659c9cddd3328";

export const oAuth = {
    singin: async () => {
        const res = await baseAPI.get(
            `/oauth/yandex/service-id?redirect_uri=${REDIRECT_URI}`,
        );
        const { service_id } = res.data;
        const URL = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${REDIRECT_URI}`;
        window.open(URL);
    },

    takeToken: async (code: string) => {
        const data = {
            code: code,
            redirect_uri: REDIRECT_URI,
        };
        const res2 = await baseAPI.post(`/oauth/yandex`, JSON.stringify(data));
        console.log(res2);
    },

    // authAPI.user();
};
