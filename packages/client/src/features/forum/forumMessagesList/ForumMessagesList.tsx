import { FC } from "react";
import { IForumMessage } from "@/types/types";
import cls from "./ForumMessagesList.module.scss";
import noPic from "@/assets/img/no-pic.svg";

interface IForumMessagesListProps {
    messages: IForumMessage[];
}

/* Компонент списка сообщений форума. */
export const ForumMessagesList: FC<IForumMessagesListProps> = ({
    messages,
}) => {
    return (
        <div className={cls.messageList}>
            {messages ? (
                messages.map(
                    ({
                        messageId,
                        authorName,
                        authorAvatar,
                        messageDate,
                        messagetext,
                    }) => {
                        const avatar = authorAvatar ? authorAvatar : noPic;

                        return (
                            <div key={messageId}>
                                <div className={cls.messageTitle}>
                                    <div className={cls.messageAuthor}>
                                        {authorName}
                                    </div>
                                    <div className={cls.messageDate}>
                                        {messageDate}
                                    </div>
                                </div>
                                <div className={cls.messageBody}>
                                    <div
                                        className={cls.authorAvatar}
                                        style={{
                                            backgroundImage: `url(${avatar})`,
                                        }}></div>
                                    <div className={cls.messageText}>
                                        {messagetext}
                                    </div>
                                </div>
                            </div>
                        );
                    },
                )
            ) : (
                <div>Пусто</div>
            )}
        </div>
    );
};
