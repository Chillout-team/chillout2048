import axios from "axios";
import { YANDEX_API_URL } from "../consts/common";
import { Request } from "express";
import { IUserData } from "types";

export const checkAuth = async (req: Request): Promise<boolean> => {
    const url = `${YANDEX_API_URL}/api/v2/auth/user`;
    try {
        if (req.headers.cookie) {
            const { data } = await axios.get(url, {
                headers: {
                    cookie: req.headers.cookie,
                },
            });

            const userId = (data as IUserData).id;
            return userId ? true : false;
        }
        return false;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status !== 200) {
                return false;
            }
        }
        throw new Error("Server error");
    }
};
