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

export interface IUserState {
    user: IUserData | null;
    error?: string;
    loadingStatus: "loading" | "idle" | "failed";
}

export interface IForumTopic {
    messages: IForumMessage[];
    topic_id: string;
    name: string;
    messagesCount: number;
    lastMessage: string;
    lastMessageDate: string;
}

export interface Emoji {
    content: string;
    users: number[];
}

export interface IForumMessage {
    id: string;
    topic_id: string;
    user: IUserForum;
    messageDate: string;
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
