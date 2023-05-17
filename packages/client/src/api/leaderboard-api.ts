import { TIndexed } from "@/types/types";
import { baseAPI } from "./api";

export const leaderboardAPI = {
    async addUser(data: TIndexed) {
        return await baseAPI.post(`/leaderboard`, JSON.stringify(data));
    },
    async getTeam(data: TIndexed, teamName: string) {
        return await baseAPI.post(
            `/leaderboard/${teamName}`,
            JSON.stringify(data),
        );
    },
};
