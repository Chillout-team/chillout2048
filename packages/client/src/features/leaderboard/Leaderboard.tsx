import { Main } from "@/components/common/main/Main";
import { Header } from "@/components/common/header/Header";
import { IPositionItem, Position } from "./position/Position";
import cls from "./Leaderboard.module.scss";

export const Leaderboard = () => {
    const headLeaderboard: IPositionItem = {
        position: "Место",
        name: "Игрок",
        score: "Счет",
    };

    const leaderList: IPositionItem[] = [
        {
            position: "1",
            name: "Петя",
            score: "1000",
        },
        {
            position: "2",
            name: "Петя",
            score: "1000",
        },
        {
            position: "3",
            name: "Петя",
            score: "1000",
        },
        {
            position: "4",
            name: "Петя",
            score: "1000",
        },
        {
            position: "5",
            name: "Петя",
            score: "1000",
        },
        {
            position: "6",
            name: "Петя",
            score: "1000",
        },
        {
            position: "7",
            name: "Петя",
            score: "1000",
        },
    ];

    const isAuth = true;

    return (
        <>
            <Header isAuth={isAuth} />
            <Main extraClass={cls.extra}>
                {isAuth && (
                    <div className={cls.head}>
                        <h1>2048</h1>
                        <h3>Рейтинг</h3>
                    </div>
                )}
                <ul>
                    <Position
                        title={true}
                        item={headLeaderboard}
                        subClass={cls.sub}
                    />
                    {leaderList.map((item, index) => {
                        return <Position key={index} item={item} />;
                    })}
                </ul>
            </Main>
        </>
    );
};
