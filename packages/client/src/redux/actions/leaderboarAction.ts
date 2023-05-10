import { leaderboardAPI } from "@/api/leaderboard-api";
import { IGetTeamLeaderbord, TIndexed } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addUserToLederboard = createAsyncThunk(
    "/leaderboard",
    async (data: TIndexed, { rejectWithValue }) => {
        try {
            const arg = {
                data,
                ratingFieldName: "score",
                teamName: "chillout",
            };
            const response = await leaderboardAPI.addUser(arg);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                `Ошибка добавления пользователя в лидерборд: ${
                    (error as Error).message
                }`,
            );
        }
    },
);

export const getTeam = createAsyncThunk(
    "/leaderboard/{teamName}",
    async (_, { rejectWithValue }) => {
        try {
            const arg: IGetTeamLeaderbord = {
                teamName: "chillout",
                data: {
                    ratingFieldName: "score",
                    cursor: 0,
                    limit: 10,
                },
            };
            const response = await leaderboardAPI.getTeam(
                arg.data,
                arg.teamName,
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                `Ошибка получения лидерборда команды: ${
                    (error as Error).message
                }`,
            );
        }
    },
);
