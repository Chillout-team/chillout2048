import { TIndexed, IUserData } from "@/types/types";
import { baseAPI } from "./api";

export const userAPI = {
    async changeProfile(data: TIndexed) {
        return baseAPI.put<IUserData>(`/user/profile`, JSON.stringify(data));
    },
    async changeAvatar(data: FormData) {
        return baseAPI.put("/user/profile/avatar", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    async changePassword(data: TIndexed) {
        return baseAPI.put<IUserData>("/user/password", JSON.stringify(data));
    },
};
