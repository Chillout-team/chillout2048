import { Header } from "@/components/common/header/Header";
import { Main } from "@/components/common/main/Main";
import cls from "./GameStart.module.scss";
import { Link } from "react-router-dom";
import { Button } from "@/components/common/button/Button";
import { GamePic } from "@/assets/img/GamePic";
import { ROUTES } from "@/router/routes";

export const GameStart = () => {
    return (
        <Main>
            <Header isAuth={true} userName="Иван" />
            <div className={cls.main_page_wrapper}>
                <h1 className={cls.header}># 2048</h1>
                <div className={cls.wrapper}>
                    <p className={cls.left}>
                        <span>Играть онлайн: игра 2048</span>
                        <br /> Объединяйте плитки с одинаковыми числами и
                        соберите 2048
                    </p>
                    <div className={cls.right}>
                        <div className={cls.p_wrapper}>
                            <p>
                                Счет <br />
                                <span>0</span>
                            </p>
                            <p>
                                Рекорд <br /> <span>0</span>
                            </p>
                        </div>
                        <Button
                            size="medium"
                            color="orange"
                            type="submit"
                            onClick={() => {
                                return;
                            }}
                            children="Новая игра"
                        />
                    </div>
                </div>
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
            </div>
        </Main>
    );
};
