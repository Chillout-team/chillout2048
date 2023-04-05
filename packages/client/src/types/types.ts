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
