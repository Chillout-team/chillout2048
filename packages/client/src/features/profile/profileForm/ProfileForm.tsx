import { FC, useState } from "react";
import cls from "./ProfileForm.module.scss";
import { Link } from "react-router-dom";
import { FormEditProfile } from "./FormEditProfile";
import { FormEditPassword } from "./FormEditPasswor";
import { ROUTES } from "@/router/routes";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAuthorization } from "@/hooks/useAuthorization";

export const ProfileForm: FC = () => {
    const login = useSelector(
        (state: RootState) => state.user.user?.login || "",
    );

    const { handleLogout } = useAuthorization();

    const [toggle, setToggle] = useState(true);
    const [isProfileForm, setProfileForm] = useState(true);

    const onToggle = () => setToggle(!toggle);

    const toggleForm = () => {
        onToggle();
        setProfileForm(!isProfileForm);
    };

    return (
        <div className={cls.container}>
            <h1 className={cls.title}>{login}</h1>

            {isProfileForm ? (
                <FormEditProfile toggle={toggle} onToggle={onToggle} />
            ) : (
                <FormEditPassword toggle={toggle} toggleForm={toggleForm} />
            )}
            <div className={toggle ? cls.links : `${cls.links} ${cls.hidden}`}>
                <Link className={cls.link} to="" onClick={onToggle}>
                    Изменить данные
                </Link>
                <Link className={cls.link} to="" onClick={toggleForm}>
                    Изменить пароль
                </Link>
                <Link
                    className={cls.link}
                    to={ROUTES.HOME.path}
                    onClick={handleLogout}>
                    Выйти
                </Link>
            </div>
        </div>
    );
};
