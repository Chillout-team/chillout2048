import { Main } from "@/components/common/main/Main";
import { Header } from "@/components/common/header/Header";
import cls from "./Game.module.scss";
import { GameLoad } from "@/utils/game/Game";
import { useEffect } from "react";
import { activateFullscreen, deactivateFullscreen } from "@/utils/fullscreenAPI/fullscreenAPI";
import full from '@/assets/img/full.svg';

export const Game = () => {
    let canvas: HTMLCanvasElement;

    useEffect(() => {
        canvas = document.getElementById("canvas") as HTMLCanvasElement;
        GameLoad(canvas);
    }, []);

    const toggleFullscreen = () => {
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
                    <button
                        type="button"
                        className={cls.button_full}
                        onClick={toggleFullscreen}
                    >
                        <img
                            className={cls.icon_full}
                            src={full}
                            alt="fullscreen"
                            width="16"
                            height="16"
                        />
                    </button>
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
