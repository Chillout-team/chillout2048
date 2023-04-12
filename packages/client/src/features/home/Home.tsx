import { FC } from "react";
import { Main } from "../../components/common/main/Main";
import { Header } from "../../components/common/header/Header";
import { Button } from "../../components/common/button/Button";
import { GamePic } from "../../assets/img/GamePic";
import cls from "./Home.module.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "@/router/routes";

export const Home: FC = () => {
    return (
        <Main>
            <Header />
            <div className={cls.main_page_wrapper}>
                <h1 className={cls.header}># 2048</h1>
                <p className={cls.header_text}>
                    <span>Как играть:</span> Передвигая плитки, нужно сложить
                    кубики одного «номинала».
                    <br /> Целью игры является получение плитки номинала «2048».
                </p>
                <Link to={ROUTES.GAME.path}>
                    <Button
                        size="medium"
                        color="orange"
                        type="submit"
                        onClick={() => {
                            return;
                        }}
                        children="Начать игру!"
                    />
                </Link>
                <GamePic class={cls.img} />

                <p className={cls.text}>
                    Проверьте на сколько вы удачливый и весело проведите свое
                    свободное время.
                </p>
            </div>
        </Main>
    );
};
