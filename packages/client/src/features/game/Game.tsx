import { Main } from "../../components/common/main/Main";
import { Header } from "../../components/common/header/Header";
import cls from "./Game.module.scss";
import { GameLoad } from "@/utils/game/Game";
import { useEffect } from "react";

export const Game = () => {
    useEffect(() => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        GameLoad(canvas);
    }, []);

    return (
        <>
            <Header isAuth={false} />
            <Main>
                <div className={cls.main_page_wrapper}>
                    <h1 className={cls.header}># 2048</h1>
                    <p className={cls.header_text}>
                        <span>Как играть:</span> Передвигая плитки, нужно
                        сложить кубики одного «номинала».
                        <br /> Целью игры является получение плитки номинала
                        «2048».
                    </p>
                    <canvas id="canvas" className={cls.canvas}></canvas>
                    <p className={cls.text}>
                        Проверьте на сколько вы удачливый и весело проведите
                        свое свободное время.
                    </p>
                </div>
            </Main>
        </>
    );
};
