import { userAPI } from "@/api/user-api";
import { TIndexed } from "@/types/types";

export const changeAvatar = async (data: FormData) => {
    try {
        const res = await userAPI.changeAvatar(data);
        return res.data;
    } catch (err) {
        console.error(
            `${(err as Error).message}. Авторизуйтесь чтобы появились данные`,
        );
    }
};

export const changeProfile = async (data: TIndexed) => {
    try {
        const res = await userAPI.changeProfile(data);
        return res.data;
    } catch (err) {
        console.error(
            `${(err as Error).message}. Авторизуйтесь чтобы появились данные`,
        );
    }
};

export const changePassword = async (data: TIndexed) => {
    try {
        await userAPI.changePassword(data);
    } catch (err) {
        console.error(
            `${(err as Error).message}. Авторизуйтесь чтобы появились данные`,
        );
    }
};
