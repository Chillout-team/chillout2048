import axios from "axios";
import { YANDEX_API_URL } from "../consts/common";

export const baseAPI = axios.create({
    baseURL: YANDEX_API_URL,
    withCredentials: true,
});
