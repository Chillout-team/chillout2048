export type TIndexed<T = any> = {
    [key in string]: T;
};

export interface IUserData {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    password?: string;
    phone: string;
    avatar?: string;
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
