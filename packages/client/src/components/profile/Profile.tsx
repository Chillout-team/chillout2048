import { FC, useEffect, useState } from "react";
import noPic from "../../assets/img/no-pic.svg";
import { YANDEX_API_URL } from "../../consts/common";
import { IUserData } from "../../types/types";
import { Header } from "../common/header/Header";
import { Main } from "../common/main/Main";
import { ProfileAvatar } from "./profileAvatar/ProfileAvatar";
import { ProfileForm } from "./profileForm/ProfileForm";

export const Profile: FC<IUserData> = (props: IUserData) => {
    const [avatar, setAvatar] = useState(noPic);
    const [login, setLogin] = useState("");

    useEffect(() => {
        if (props.avatar)
            setAvatar(`${YANDEX_API_URL}resources${props.avatar}`);
        if (props.login) setLogin(props.login);
    }, [props.avatar, props.login]);

    return (
        <>
            <Header isAuth={true} userName={login} avatar={avatar} />
            <Main>
                <ProfileAvatar avatar={avatar} setAvatar={setAvatar} />
                <ProfileForm
                    first_name={props.first_name}
                    second_name={props.second_name}
                    display_name={props.display_name}
                    login={login}
                    email={props.email}
                    phone={props.phone}
                    setLogin={setLogin}
                />
            </Main>
        </>
    );
};
