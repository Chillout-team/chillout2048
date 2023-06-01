import { Topic } from "@/types/types";
import cls from "./ForumMessagesList.module.scss";
import noPic from "@/assets/img/no-pic.svg";
import { EmojiFooter } from "../emoji/emojiFooter/EmojiFooter";
import { useParams } from "react-router-dom";
import { FC } from "react";

interface Props {
    topic: Topic | undefined;
}

/* Компонент списка сообщений форума. */
export const ForumMessagesList: FC<Props> = ({ topic }) => {
    const { id: topicId } = useParams();
    if (topic) {
        const { topic: targetTopic, topicMessages } = topic;
        console.log(targetTopic.user);
        return (
            <div className={cls.messageList}>
                <div>
                    <div className={cls.messageTitle}>
                        <div className={cls.messageAuthor}>
                            {targetTopic.user?.display_name
                                ? targetTopic.user.display_name
                                : targetTopic.user.login}
                        </div>
                        <div className={cls.messageDate}>
                            {new Date(targetTopic.createdAt).toLocaleString()}
                        </div>
                    </div>
                    <div className={cls.messageBody}>
                        <div
                            className={cls.authorAvatar}
                            style={{
                                backgroundImage: `url(${targetTopic.user.avatar})`,
                            }}></div>
                        <div className={cls.messageText}>
                            <p>{targetTopic.name}</p>
                        </div>
                    </div>
                </div>
                {topicMessages.length ? (
                    topicMessages.map(
                        ({
                            message_id: messageId,
                            user,
                            message,
                            createdAt,
                            emojis,
                        }) => {
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
                                            {new Date(
                                                createdAt,
                                            ).toLocaleString()}
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
    }
    return <div></div>;
};
