import { FC } from "react";
import { Header } from "@/components/common/header/Header";
import { Main } from "@/components/common/main/Main";
import { ProfileForm } from "./profileForm/ProfileForm";
import { ProfileAvatar } from "./profileAvatar/ProfileAvatar";

export const Profile: FC = () => {
    return (
        <>
            <Header />
            <Main>
                <ProfileAvatar />
                <ProfileForm />
            </Main>
        </>
    );
};
