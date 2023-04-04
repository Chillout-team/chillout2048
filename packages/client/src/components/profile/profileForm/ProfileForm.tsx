import React, { Dispatch, FC, SetStateAction, useState } from "react";
import cls from "./ProfileForm.module.scss";
import { Link } from "react-router-dom";
import { FormEditProfile } from "./FormEditProfile";
import { FormEditPassword } from "./FormEditPasswor";
import { IUserData } from "../../../types/types";

type TProfileForm = IUserData & { setLogin: Dispatch<SetStateAction<string>> };

export const ProfileForm: FC<TProfileForm> = ({
    first_name,
    second_name,
    display_name,
    login,
    email,
    phone,
    setLogin
}) => {
    
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
                <FormEditProfile
                    toggle={toggle}
                    onToggle={onToggle}
                    first_name={first_name}
                    second_name={second_name}
                    display_name={display_name}
                    login={login}
                    email={email}
                    phone={phone}
                    setLogin={setLogin}
                />
            ) : (
                <FormEditPassword toggle={toggle} toggleForm={toggleForm} />
            )}

            <div className={toggle ? cls.links : cls.links + " " + cls.hidden}>
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
