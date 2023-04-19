import { ROUTES } from "@/router/routes";
import cls from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/actions/authAction";

type Props = {
    extraClass?: string;
};

export const Header = ({ extraClass = "" }: Props) => {
    const avatar = useSelector(
        (state: RootState) => state.user?.user?.avatar || "",
    );
    const login = useSelector(
        (state: RootState) => state.user?.user?.login || "",
    );
    const dispatch = useAppDispatch();

    const handleLogout = () => dispatch(logout());

    if (login) {
        return (
            <header className={`${cls.header} ${extraClass}`}>
                <nav>
                    <div>
                        <Link to={ROUTES.HOME.path}>Домой</Link>
                        <Link to={ROUTES.FORUM.path}>Форум</Link>
                        <Link to={ROUTES.LEADERBOARD.path}>Рейтинг</Link>
                    </div>
                    <div>
                        <Link
                            to={ROUTES.PROFILE.path}
                            className={cls.link_user}>
                            <div>
                                <img
                                    src={avatar}
                                    alt="Avatar"
                                    width="34"
                                    height="34"
                                />
                            </div>
                            {login}
                        </Link>
                        <Link to={ROUTES.HOME.path} onClick={handleLogout}>
                            Выйти
                        </Link>
                    </div>
                </nav>
            </header>
        );
    }
    return (
        <header className={`${cls.header} ${extraClass}`}>
            <nav>
                <div>
                    <Link to={ROUTES.HOME.path}>Домой</Link>
                    <Link to={ROUTES.FORUM.path}>Форум</Link>
                    <Link to={ROUTES.LEADERBOARD.path}>Рейтинг</Link>
                </div>
                <div>
                    <Link to={ROUTES.SINGUP.path}>Зарегистрироваться</Link>
                    <Link to={ROUTES.SINGIN.path}>Войти</Link>
                </div>
            </nav>
        </header>
    );
};
