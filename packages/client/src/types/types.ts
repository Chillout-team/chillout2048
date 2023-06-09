/* eslint-disable no-unused-vars */
import { RootState } from "@/redux/store";

type ExitFullscreen = typeof document.exitFullscreen;
type RequestFullscreen = typeof document.documentElement.requestFullscreen;

declare global {
    interface Document {
        webkitExitFullscreen: ExitFullscreen;
        mozCancelFullScreen: ExitFullscreen;
        msExitFullscreen: ExitFullscreen;
    }

    interface HTMLElement {
        webkitRequestFullscreen: RequestFullscreen;
        mozRequestFullScreen: RequestFullscreen;
        msRequestFullscreen: RequestFullscreen;
    }

    interface Window {
        __PRELOADED_STATE__: RootState;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TIndexed<T = any> = {
    [key in string]: T;
};

export interface IUserData {
    id?: number | null;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    password?: string;
    phone: string;
    avatar?: string;
}

export interface ITheme {
    id: number;
    theme: string;
    themeId: number;
}

export interface IUserState {
    user: IUserData | null;
    theme: ITheme | null;
    error?: string;
    loadingStatus: "loading" | "idle" | "failed";
}

export interface ITopic {
    createdAt: string;
    name: string;
    topic_id: number;
    user: IUserData;
}

export type Topic = {
    topic: ITopic;
    topicMessages: IForumMessage[];
    topicEmojis: Emoji[];
};

export interface IForumTopic {
    messages: IForumMessage[];
    topic_id: string;
    name: string;
    messagesCount: number;
    lastMessage: string;
    createdAt: string;
}

export interface Emoji {
    message_id: string;
    emoji: string;
    users_id: number[];
}

export interface IForumMessage {
    message_id: string;
    topic_id: string;
    user: IUserForum;
    createdAt: string;
    message: string;
    emojis?: Emoji[];
}

export interface IUserForum {
    avatar: string | null;
    display_name: string;
    id: string;
    login: string;
}

export interface IGetTeamLeaderbord {
    data: TIndexed;
    teamName: string;
}

export interface ILeaderboar {
    data: {
        score: string;
        userName: string;
    };
}

export interface ILeaderbordState {
    data: ILeaderboar[] | [] | null;
    error?: string;
    loadingStatus: "loading" | "idle" | "failed";
}
