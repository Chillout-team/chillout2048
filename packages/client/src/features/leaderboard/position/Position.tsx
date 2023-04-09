import cls from "./Position.module.scss";
import { FC } from "react";

interface IProps {
    item: IPositionItem;
    subClass?: string;
    title?: boolean;
}

export interface IPositionItem {
    position: string;
    name: string;
    score: string;
}

export const Position: FC<IProps> = ({
    item,
    subClass = "",
    title = false,
}) => {
    const { position, name, score } = item;
    return (
        <li className={`${cls.position} ${subClass}`}>
            <div>{position}</div>
            <div>{name}</div>
            <div className={!title ? cls.__orange : ""}>{score}</div>
        </li>
    );
};
