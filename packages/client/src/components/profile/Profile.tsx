import { FC, useEffect, useState } from "react";
import noPic from "../../assets/img/no-pic.svg";
import { YANDEX_API_URL } from "../../consts/common";
import { IUserData } from "../../types/types";
import { Header } from "../common/header/Header";
import { Main } from "../common/main/Main";
import { ProfileAvatar } from "./profileAvatar/ProfileAvatar";
import { ProfileForm } from "./profileForm/ProfileForm";

export const Profile: FC<IUserData> = ({
    first_name,
    second_name,
    display_name,
    login,
    email,
    avatar,
    phone
}) => {
    const [avatarState, setavatarState] = useState(noPic);
    const [loginState, setloginState] = useState("");

    useEffect(() => {
        if (avatar)
            setavatarState(`${YANDEX_API_URL}resources${avatar}`);
        if (login) setloginState(login);
    }, [avatar, login]);

    return (
        <>
            <Header isAuth={true} userName={loginState} avatar={avatarState} />
            <Main>
                <ProfileAvatar avatar={avatarState} setAvatar={setavatarState} />
                <ProfileForm
                    first_name={first_name}
                    second_name={second_name}
                    display_name={display_name}
                    login={loginState}
                    email={email}
                    phone={phone}
                    setLogin={setloginState}
                />
            </Main>
        </>
    );
};
