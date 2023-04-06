import React, { Dispatch, FC, SetStateAction, useState } from "react";
import cls from "./ProfileForm.module.scss";
import { Link } from "react-router-dom";
import { FormEditProfile } from "./FormEditProfile";
import { FormEditPassword } from "./FormEditPasswor";
import { IUserData } from "@/types/types";

type TProfileForm = {
    user: IUserData;
} & {
    setLogin: Dispatch<SetStateAction<string>>;
};

export const ProfileForm: FC<TProfileForm> = ({ user, setLogin }) => {
    const [toggle, setToggle] = useState(true);
    const [isProfileForm, setProfileForm] = useState(true);

    const onToggle = () => setToggle(!toggle);

    const toggleForm = () => {
        onToggle();
        setProfileForm(!isProfileForm);
    };

    return (
        <div className={cls.container}>
            <h1 className={cls.title}>{user.login}</h1>

            {isProfileForm ? (
                <FormEditProfile
                    toggle={toggle}
                    onToggle={onToggle}
                    user={user}
                    setLogin={setLogin}
                />
            ) : (
                <FormEditPassword toggle={toggle} toggleForm={toggleForm} />
            )}

            <div className={toggle ? cls.links : `${cls.links} ${cls.hidden}`}>
                <Link className={cls.link} to={""} onClick={onToggle}>
                    Изменить данные
                </Link>
                <Link className={cls.link} to={""} onClick={toggleForm}>
                    Изменить пароль
                </Link>
                <Link className={cls.link} to={"/"}>
                    Выйти
                </Link>
            </div>
        </div>
    );
};
