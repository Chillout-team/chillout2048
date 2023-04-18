import { Main } from "@/components/common/main/Main";
import { Header } from "@/components/common/header/Header";
import cls from "./Game.module.scss";
import { GameEngine } from "@/utils/game/Game";
import { useEffect, useState } from "react";
import {
    activateFullscreen,
    deactivateFullscreen,
} from "@/utils/fullscreenAPI/fullscreenAPI";
import full from "@/assets/img/full.svg";
import { Button } from "@/components/common/button/Button";

export const Game = () => {
    let canvas: HTMLCanvasElement;
    const game = GameEngine;

    const [isPlay, setIsPlay] = useState(false);

    function startNewGame() {
        game.start();
        setIsPlay(true);
    }

    useEffect(() => {
        canvas = document.getElementById("canvas") as HTMLCanvasElement;
        game.init(canvas);
    }, []);

    const toggleFullscreen = () => {
        activateFullscreen(canvas!);
        deactivateFullscreen();
    };

    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    return (
        <>
            <Header />
            <Main>
                <div className={cls.wrapper}>
                    <div className={cls.header}>
                        <div>
                            <h1>2048</h1>
                            <h4>Играть онлайн: игра 2048</h4>
                            <p>
                                Объединяйте плитки с одинаковыми числами и
                                соберите <b>2048</b>
                            </p>
                        </div>
                        <div className={cls.scores_wrapper}>
                            <div className={cls.scores}>
                                <div className={cls.score}>
                                    <div className={cls.title}>Счет</div>
                                    <div className={cls.number}>{score}</div>
                                </div>
                                <div className={cls.score}>
                                    <div className={cls.title}>Рекорд</div>
                                    <div className={cls.number}>
                                        {bestScore}
                                    </div>
                                </div>
                            </div>
                            <div className={cls.buttons}>
                                <Button
                                    size="small"
                                    color="orange"
                                    type="submit"
                                    onClick={() => startNewGame()}>
                                    Новая игра
                                </Button>
                                <button
                                    type="button"
                                    className={cls.button_full}
                                    onClick={toggleFullscreen}>
                                    <img
                                        className={cls.icon_full}
                                        src={full}
                                        alt="fullscreen"
                                        width="16"
                                        height="16"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cls.body}>
                        {!isPlay && (
                            <Button
                                size="big"
                                color="orange"
                                type="submit"
                                onClick={() => startNewGame()}>
                                Начать игру!
                            </Button>
                        )}

                        <canvas id="canvas" className={cls.canvas}></canvas>
                    </div>
                </div>
            </Main>
        </>
    );
};
