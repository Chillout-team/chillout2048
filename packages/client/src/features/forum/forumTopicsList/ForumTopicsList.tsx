import { FC, useCallback } from "react";
import { IForumTopic } from "@/types/types";
import { declensionByNumbers } from "@/utils/utils";
import cls from "./ForumTopicsList.module.scss";
import { useNavigate } from "react-router-dom";

interface Props {
    topics: IForumTopic[] | undefined;
    loadMessageList: (id: string) => void;
}

/** Компонент списка тем форума. */
export const ForumTopicsList: FC<Props> = ({ topics, loadMessageList }) => {
    const navigate = useNavigate();
    const handleClickTopic = useCallback((id: string) => {
        loadMessageList(id);
        navigate(`/forum/${id}`);
    }, []);

    return (
        <ul className={cls.topicsList}>
            {topics?.length ? (
                topics.map(
                    ({
                        topic_id,
                        name,
                        messagesCount,
                        lastMessage,
                        createdAt,
                    }) => {
                        return (
                            <li
                                key={topic_id}
                                className={cls.topic}
                                onClick={() => handleClickTopic(topic_id)}>
                                <div className={cls.topicInfo}>
                                    <h3 className={cls.topicTitle}>{name}</h3>
                                    <p className={cls.topicDescription}>
                                        {lastMessage || "Нет комментариев"}
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
                                    {new Date(createdAt).toLocaleString()}
                                </div>
                            </li>
                        );
                    },
                )
            ) : (
                <div>Пусто</div>
            )}
        </ul>
    );
};
