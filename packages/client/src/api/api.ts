import { YANDEX_API_URL } from "@/consts/common";
import axios from "axios";


export const baseAPI = axios.create({
    baseURL: YANDEX_API_URL,
    withCredentials: true,
});
