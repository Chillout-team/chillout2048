import React, { FC } from 'react';
import { Main } from '../common/main/Main';
import { Header } from '../common/header/Header';
import { Button } from '../common/button/Button';
import { GamePic } from '../../assets/img/GamePic';
import cls from './MainPage.module.scss';

export const MainPage: FC = () => {
    return (
        <Main>
            <Header isAuth={false} />
            <div className={cls.main_page_wrapper}>
                <h1 className={cls.header}># 2048</h1>
                <p className={cls.header_text}>
                    <span>Как играть:</span> Передвигая плитки, нужно сложить
                    кубики одного «номинала».
                    <br /> Целью игры является получение плитки номинала «2048».
                </p>
                <Button
                    size="medium"
                    color="orange"
                    type="submit"
                    onClick={() => {
                        return;
                    }}
                    children="Начать игру!"
                />
                <GamePic class={cls.img} />

                <p className={cls.text}>
                    Проверьте на сколько вы удачливый и весело проведите свое
                    свободное время.
                </p>
            </div>
        </Main>
    );
};

export default MainPage;
