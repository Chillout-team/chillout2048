import { YANDEX_API_URL } from "@/consts/common";
import axios from "axios";

export const baseAPI = axios.create({
    baseURL: YANDEX_API_URL,
    withCredentials: true,
    timeout: 5000,
    headers: {
        "Access-Control-Allow-Methods": "GET, POST, PUT",
        "Access-Control-Allow-Headers": "content-type",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":
            "https://oauth.yandex.ru,http://127.0.0.1:3000",
    },
});
