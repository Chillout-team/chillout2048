import { FC, useCallback } from "react";
import { IForumTopic } from "@/types/types";
import { declensionByNumbers } from "@/utils/utils";
import cls from "./ForumTopicsList.module.scss";
import { useNavigate } from "react-router-dom";

interface Props {
    topics: IForumTopic[] | undefined;
    // eslint-disable-next-line no-unused-vars
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
                        topicId,
                        title,
                        messagesCount,
                        lastMessage,
                        lastMessageDate,
                    }) => {
                        return (
                            <li
                                id={topicId}
                                key={topicId}
                                className={cls.topic}
                                onClick={() => handleClickTopic(topicId)}>
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
