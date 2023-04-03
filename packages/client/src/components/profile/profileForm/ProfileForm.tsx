import React, { Dispatch, FC, SetStateAction, useState } from "react";
import cls from "./ProfileForm.module.scss";
import { Link } from "react-router-dom";
import { FormEditProfile } from "./FormEditProfile";
import { FormEditPassword } from "./FormEditPasswor";
import { IUserData } from "../../../types/types";

type IProfileForm = IUserData & { setLogin: Dispatch<SetStateAction<string>> };

export const ProfileForm: FC<IProfileForm> = props => {
    const [toggle, setToggle] = useState(true);
    const [isProfileForm, setProfileForm] = useState(true);

    const onToggle = () => setToggle(!toggle);

    const toggleForm = () => {
        onToggle();
        setProfileForm(!isProfileForm);
    };

    return (
        <div className={cls.container}>
            <h1 className={cls.title}>{props.login}</h1>

            {isProfileForm ? (
                <FormEditProfile
                    toggle={toggle}
                    onToggle={onToggle}
                    first_name={props.first_name}
                    second_name={props.second_name}
                    display_name={props.display_name}
                    login={props.login}
                    email={props.email}
                    phone={props.phone}
                    setLogin={props.setLogin}
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
