import { IForumTopic } from "@/types/types";
import cls from "./ForumMessagesList.module.scss";
import noPic from "@/assets/img/no-pic.svg";
import { EmojiFooter } from "../emoji/emojiFooter/EmojiFooter";
import { useParams } from "react-router-dom";
import { FC } from "react";

interface Props {
    topic: IForumTopic | undefined;
}

/* Компонент списка сообщений форума. */
export const ForumMessagesList: FC<Props> = ({ topic }) => {
    const { id: topicId } = useParams();

    return (
        <div className={cls.messageList}>
            {topic ? (
                topic.messages.map(
                    ({ id: messageId, user, message, messageDate, emojis }) => {
                        const avatarUrl = user.avatar ? user.avatar : noPic;
                        return (
                            <div key={messageId}>
                                <div className={cls.messageTitle}>
                                    <div className={cls.messageAuthor}>
                                        {user.display_name
                                            ? user.display_name
                                            : user.login}
                                    </div>
                                    <div className={cls.messageDate}>
                                        {messageDate}
                                    </div>
                                </div>
                                <div className={cls.messageBody}>
                                    <div
                                        className={cls.authorAvatar}
                                        style={{
                                            backgroundImage: `url(${avatarUrl})`,
                                        }}></div>
                                    <div className={cls.messageText}>
                                        <p>{message}</p>
                                        {emojis && (
                                            <EmojiFooter
                                                emojis={emojis}
                                                topic_id={topicId as string}
                                                message_id={messageId}
                                            />
                                        )}
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
