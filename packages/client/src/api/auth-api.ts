import { TIndexed } from "@/types/types";
import { baseAPI } from "./api";

export const authAPI = {
    async signin(data: TIndexed) {
        const response = await baseAPI.post(
            `/auth/signin`,
            JSON.stringify(data),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        return response;
    },
    async signup(data: TIndexed) {
        const response = await baseAPI.post(
            `/auth/signup`,
            JSON.stringify(data),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        return response;
    },
    async user() {
        const response = await baseAPI.get(`/auth/user`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    },
    async logout() {
        const response = await baseAPI.post(`/auth/logout`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    },
};
