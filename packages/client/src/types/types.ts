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

export interface IForumData {
    topics: IForumTopic[];
    messages: IForumMessage[];
}

export interface IForumTopic {
    topicId: string;
    title: string;
    messagesCount: number;
    lastMessage: string;
    lastMessageDate: string;
}

export interface IForumMessage {
    messageId: string;
    topicId: string;
    authorAvatar: string;
    authorName: string;
    messageDate: string;
    messagetext: string;
}
