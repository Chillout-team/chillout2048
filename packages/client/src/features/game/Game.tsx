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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addUser } from "@/redux/actions/leaderboarAction";
import { useAppDispatch } from "@/redux/hooks";
import { bigIntToStr } from "@/utils/bigIntToStr";

type GameOverStatus = "win" | "lose" | "none";

export const Game = () => {
    let canvas: HTMLCanvasElement;
    const game = GameEngine;

    const login = useSelector(
        (state: RootState) => state.user.user?.login || "",
    );

    const [isPlay, setIsPlay] = useState(false);
    const [gameOver, setGameOver] = useState("none");
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(
        Number(localStorage.getItem("bestScore")) || 0,
    );

    const dispatch = useAppDispatch();

    function startNewGame() {
        game.start();
    }

    useEffect(() => {
        canvas = document.getElementById("canvas") as HTMLCanvasElement;
        game.init(
            canvas,
            setIsPlay,
            setGameOver as React.Dispatch<React.SetStateAction<GameOverStatus>>,
            setScore,
        );
    }, []);

    useEffect(() => {
        if (gameOver === "win" || gameOver === "lose") {
            if (login !== "") {
                dispatch(
                    addUser({
                        userName: login,
                        score: score,
                    }),
                );
            }
            const localValue = Number(localStorage.getItem("bestScore")) || 0;
            if (score > localValue) {
                localStorage.setItem("bestScore", `${score}`);
                setBestScore(score);
            }
        }
    }, [gameOver]);

    const toggleFullscreen = () => {
        const canvasEl = document.getElementById("canvas") as HTMLCanvasElement;
        activateFullscreen(canvasEl);
        !isPlay && startNewGame();
        deactivateFullscreen();
    };

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
                                    <div className={cls.number}>
                                        {bigIntToStr(score)}
                                    </div>
                                </div>
                                <div className={cls.score}>
                                    <div className={cls.title}>Рекорд</div>
                                    <div className={cls.number}>
                                        {bigIntToStr(bestScore)}
                                    </div>
                                </div>
                            </div>
                            <div className={cls.buttons}>
                                <Button
                                    size="small"
                                    color="orange"
                                    type="button"
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
                                color={
                                    gameOver === "win"
                                        ? "yellow"
                                        : gameOver === "lose"
                                        ? "red"
                                        : "orange"
                                }
                                type="button"
                                onClick={() => startNewGame()}>
                                {gameOver === "win"
                                    ? "Вы выйграли!"
                                    : gameOver === "lose"
                                    ? "Вы проиграли!"
                                    : "Начать игру!"}
                            </Button>
                        )}

                        <canvas id="canvas" className={cls.canvas}></canvas>
                    </div>
                </div>
            </Main>
        </>
    );
};
