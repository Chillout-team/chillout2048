import cls from "./Position.module.scss";
import { FC } from "react";

interface IProps {
    item: IPositionItem;
    subClass?: string;
}

export interface IPositionItem {
    position: string;
    name: string;
    score: string;
}

export const Position: FC<IProps> = ({ item, subClass = "" }) => {
    const { position, name, score } = item;
    return (
        <li className={`${cls.position} ${subClass}`}>
            <div>{position}</div>
            <div>{name}</div>
            <div>{score}</div>
        </li>
    );
};
