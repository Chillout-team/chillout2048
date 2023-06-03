import { ROUTES } from "@/router/routes";
import cls from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useAuthorization } from "@/hooks/useAuthorization";
import React from "react";
import { ThemeSwitcher } from "@/components/common/themeSwitcher/ThemeSwitcher";

type Props = {
    extraClass?: string;
};

export const Header = ({ extraClass = "" }: Props) => {
    const {
        userData: { avatar, login },
        isAuthorized,
        handleLogout,
    } = useAuthorization();

    const renderSignMenu = isAuthorized ? (
        <div>
            <Link to={ROUTES.PROFILE.path} className={cls.link_user}>
                <div>
                    <img src={avatar} alt="Avatar" width="34" height="34" />
                </div>
                {login}
            </Link>
            <Link to={ROUTES.HOME.path} onClick={handleLogout}>
                Выйти
            </Link>
        </div>
    ) : (
        <div>
            <Link to={ROUTES.SINGUP.path}>Зарегистрироваться</Link>
            <Link to={ROUTES.SINGIN.path}>Войти</Link>
        </div>
    );

    return (
        <header className={`${cls.header} ${extraClass}`}>
            <nav>
                <div>
                    <Link to={ROUTES.HOME.path}>Домой</Link>
                    <Link to={ROUTES.FORUM.path}>Форум</Link>
                    <Link to={ROUTES.LEADERBOARD.path}>Рейтинг</Link>
                </div>
                {isAuthorized && <ThemeSwitcher />}
                {renderSignMenu}
            </nav>
        </header>
    );
};
