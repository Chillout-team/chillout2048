import cls from "./Header.module.scss";
import { Link } from "react-router-dom";

type Props = {
    isAuth: boolean;
    userName?: string;
    avatar?: string;
    extraClass?: string;
};

export const Header = ({
    isAuth,
    userName,
    avatar,
    extraClass = "",
}: Props) => {
    if (isAuth) {
        return (
            <header className={`${cls.header} ${extraClass}`}>
                <nav>
                    <div>
                        <Link to="/">Домой</Link>
                        <Link to="/">Форум</Link>
                        <Link to="/">Рейтинг</Link>
                    </div>
                    <div>
                        <Link to="/profile" className={cls.link_user}>
                            <div>
                                <img
                                    src={avatar}
                                    alt="Avatar"
                                    width="34"
                                    height="34"
                                />
                            </div>
                            {userName}
                        </Link>
                        <Link to="/">Выйти</Link>
                    </div>
                </nav>
            </header>
        );
    }
    return (
        <header className={`${cls.header} ${extraClass}`}>
            <nav>
                <div>
                    <Link to="/">Форум</Link>
                    <Link to="/">Рейтинг</Link>
                </div>
                <div>
                    <Link to="/">Зарегистрироваться</Link>
                    <Link to="/">Войти</Link>
                </div>
            </nav>
        </header>
    );
};
