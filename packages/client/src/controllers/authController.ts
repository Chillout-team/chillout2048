import { authAPI } from "@/api/auth-api";

export const getUser = async () => {
    try {
        const res = await authAPI.user();
        return res.data;
    } catch (err) {
        console.error(
            `${(err as Error).message}. Авторизуйтесь чтобы появились данные`,
        );
    }
};
