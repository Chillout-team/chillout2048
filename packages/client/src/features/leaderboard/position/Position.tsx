import cls from "./Position.module.scss";
import { FC } from "react";

interface IProps {
    position: string;
    item: IPositionItem;
    subClass?: string;
    title?: boolean;
}

export interface IPositionItem {
    userName: string;
    score: string;
}

export const Position: FC<IProps> = ({
    item,
    position,
    subClass = "",
    title = false,
}) => {
    const { userName, score } = item;
    return (
        <li className={`${cls.root} ${subClass}`}>
            <div>{position}</div>
            <div>{userName}</div>
            <div className={!title ? cls.__orange : ""}>{score}</div>
        </li>
    );
};
