import { FC } from "react";
import { IForumTopic } from "@/types/types";
import { declensionByNumbers } from "@/utils/utils";
import cls from "./ForumTopicsList.module.scss";

interface IForumTopicsListProps {
    topics: IForumTopic[];
    onClickTopic: (topicId: string) => void;
}

/** Компонент списка тем форума. */
export const ForumTopicsList: FC<IForumTopicsListProps> = ({
    topics,
    onClickTopic,
}) => {
    return (
        <div className={cls.topicsList}>
            {topics?.length ? (
                topics.map(
                    ({
                        topicId,
                        title,
                        messagesCount,
                        lastMessage,
                        lastMessageDate,
                    }) => {
                        return (
                            <div
                                key={topicId}
                                className={cls.topic}
                                onClick={() => onClickTopic(topicId)}>
                                <div className={cls.topicInfo}>
                                    <h3 className={cls.topicTitle}>{title}</h3>
                                    <p className={cls.topicDescription}>
                                        {lastMessage}
                                    </p>
                                </div>
                                <div
                                    className={`${cls.topicColumn} ${cls.topicMessages}`}>
                                    <span className={cls.topicMessageCounter}>
                                        {messagesCount}
                                    </span>
                                    {declensionByNumbers(messagesCount, [
                                        "сообщение",
                                        "сообщения",
                                        "сообщений",
                                    ])}
                                </div>
                                <div
                                    className={`${cls.topicColumn} ${cls.topicDate}`}>
                                    {lastMessageDate}
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
