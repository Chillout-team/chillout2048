import { FC, useCallback, useEffect, useState } from "react";
import { Main } from "@/components/common/main/Main";
import { ForumForm } from "./forumForm/ForumForm";
import { ForumMessagesList } from "./forumMessagesList/ForumMessagesList";
import { ForumTopicsList } from "./forumTopicsList/ForumTopicsList";
import cls from "./Forum.module.scss";
import { Header } from "@/components/common/header/Header";
import formDataMock from "@/assets/mocks/forum-data.json";
import { IForumData } from "@/types/types";
import { useParams, useNavigate } from "react-router-dom";

/** Страница форума. */
export const Forum: FC = () => {
    const [forumData, setForumData] = useState<IForumData>();
    const { topics = [], messages = [] } = forumData || {};
    const { id: activeTopicId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // TODO заменить на получение данных с сервера в следующих спринтах.
        setForumData(formDataMock);
    }, [formDataMock]);

    const handleClickTopic = useCallback((id: string) => {
        navigate(`/forum/${id}`);
    }, []);

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
                        <ForumMessagesList messages={messages} />
                    ) : (
                        <ForumTopicsList
                            topics={topics}
                            onClickTopic={handleClickTopic}
                        />
                    )}
                </section>
                <ForumForm type={activeTopicId ? "message" : "topic"} />
            </Main>
        </>
    );
};
