import { TIndexed } from "@/types/types";
import { baseAPI } from "./api";

export const authAPI = {
    async signin(data: TIndexed) {
        return await baseAPI.post(`/auth/signin`, JSON.stringify(data));
    },
    async signup(data: TIndexed) {
        return await baseAPI.post(`/auth/signup`, JSON.stringify(data));
    },
    async user() {
        return await baseAPI.get(`/auth/user`);
    },
    async logout() {
        return await baseAPI.post(`/auth/logout`);
    },
};
