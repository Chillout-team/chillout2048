import { Main } from "@/components/common/main/Main";
import { Header } from "@/components/common/header/Header";
import cls from "./Game.module.scss";
import { GameLoad } from "@/utils/game/Game";
import { useEffect } from "react";
import { Button } from "@/components/common/button/Button";
import { activateFullscreen, deactivateFullscreen } from "@/utils/fullscreenAPI/fullscreenAPI";

export const Game = () => {
    useEffect(() => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        GameLoad(canvas);
    }, []);

    const toggleFullscreen = () => {
        const canvas = document.getElementById('canvas');
        activateFullscreen(canvas!);
        deactivateFullscreen();
    };

    return (
        <>
            <Header />
            <Main>
                <div className={cls.main_page_wrapper}>
                    <h1 className={cls.header}># 2048</h1>
                    <p className={cls.header_text}>
                        <span>Как играть:</span> Передвигая плитки, нужно
                        сложить кубики одного «номинала».
                        <br /> Целью игры является получение плитки номинала
                        «2048».
                    </p>
                    <Button
                        size="small"
                        color="orange"
                        type="button"
                        children="Fullscreen on"
                        onClick={toggleFullscreen}
                    />
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
