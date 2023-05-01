import { Main } from "@/components/common/main/Main";
import { Header } from "@/components/common/header/Header";
import { IPositionItem, Position } from "./position/Position";
import cls from "./Leaderboard.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ILeaderboar } from "@/types/types";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { getTeam } from "@/redux/actions/leaderboarAction";

export const Leaderboard = () => {
    const leaderList: ILeaderboar[] = useSelector(
        (state: RootState) => state.leaderboard.data || [],
    );

    const dispatch = useAppDispatch();

    const headLeaderboard: IPositionItem = {
        userName: "Игрок",
        score: "Счет",
    };

    useEffect(() => {
        dispatch(getTeam());
    }, []);

    return (
        <>
            <Header />
            <Main extraClass={cls.extra}>
                <div className={cls.head}>
                    <h1>2048</h1>
                    <h3>Рейтинг</h3>
                </div>
                <ul>
                    <Position
                        title={true}
                        item={headLeaderboard}
                        position={"Место"}
                        subClass={cls.sub}
                    />
                    {leaderList.map((item, index) => {
                        return (
                            <Position
                                key={index}
                                item={item.data}
                                position={`${index + 1}`}
                            />
                        );
                    })}
                </ul>
            </Main>
        </>
    );
};
