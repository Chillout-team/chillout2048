import { FC, useEffect, useState } from "react";
import { Main } from "@/components/common/main/Main";
import { ForumForm } from "./forumForm/ForumForm";
import { ForumMessagesList } from "./forumMessagesList/ForumMessagesList";
import { ForumTopicsList } from "./forumTopicsList/ForumTopicsList";
import cls from "./Forum.module.scss";
import { Header } from "@/components/common/header/Header";
import { IForumTopic, Topic } from "@/types/types";
import { useParams } from "react-router-dom";
import { forumAPI } from "@/api/forum";

/** Страница форума. */
export const Forum: FC = () => {
    const [topicList, setTopicList] = useState<IForumTopic[]>();
    const [topic, setTopic] = useState<Topic>();
    const { id: activeTopicId } = useParams();
    const [update, setUpdate] = useState(false);

    const loadTopicList = async () => {
        try {
            const topicList = await forumAPI.loadTopicList();
            setTopicList(topicList);
        } catch (error) {
            console.log(error);
        }
    };

    const loadMessageList = async (id?: string) => {
        try {
            const topic = await forumAPI.loadTopic(
                id || (activeTopicId as string),
            );
            setTopic(topic);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (activeTopicId) {
            loadMessageList();
        } else {
            loadTopicList();
        }
        setUpdate(false);
    }, [activeTopicId, update]);

    return (
        <>
            <Header />
            <Main>
                <header className={cls.pageHeader}>
                    <h1 className={cls.pageTitle}>Форум</h1>
                </header>
                <section className={cls.forumInner}>
                    <header className={cls.forumHeader}>
                        <h2 className={cls.forumTitle}>
                            {activeTopicId ? "Обсуждение игры" : "Список тем"}
                        </h2>
                    </header>
                    {activeTopicId ? (
                        <ForumMessagesList topic={topic} />
                    ) : (
                        <ForumTopicsList
                            topics={topicList}
                            loadMessageList={loadMessageList}
                        />
                    )}
                </section>
                <ForumForm
                    type={activeTopicId ? "message" : "topic"}
                    setUpdate={setUpdate}
                />
            </Main>
        </>
    );
};
