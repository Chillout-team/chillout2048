import { FC } from "react";
import { Header } from "@/components/common/header/Header";
import { Main } from "@/components/common/main/Main";
import { ProfileAvatar } from "./profileAvatar/ProfileAvatar";
import { ProfileForm } from "./profileForm/ProfileForm";

export const Profile: FC = () => {
    return (
        <Main>
            <Header isAuth={true} userName="Иван" />
            <ProfileAvatar />
            <ProfileForm />
        </Main>
    );
};
