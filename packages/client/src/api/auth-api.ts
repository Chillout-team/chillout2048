import { baseAPI } from "./api";


export const authAPI = {
    async user() {
        const response = await baseAPI.get(`/auth/user`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    },
};
