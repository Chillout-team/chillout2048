import { Main } from "@/components/common/main/Main";
import { AuthenticationForm } from "./authenticationForm/AuthenticationForm";
import { InputForm } from "./inputForm/InputForm";
import { AuthenticationData } from "./AuthenticationData";
import { Formik } from "formik";
import { AuthRequest } from "@/store/AuthSlice";
import { useAuthDispatch } from "@/store/Store";
import { FC } from "react";

interface IAuthenticationProps {
    mode: "auth" | "reg";
}

interface IProfileForm {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    password: string;
}

export const Authentication: FC<IAuthenticationProps> = ({ mode }) => {
    const { title, goToRegistration, goToHome, buttonTitle, inputs } =
        AuthenticationData[mode];
    const dispatch = useAuthDispatch();
    const onSubmit = (values: IProfileForm) => {
        const path: string = mode === "reg" ? "/auth/signup" : "/auth/signin";
        dispatch(AuthRequest({ data: values, path }));
    };

    return (
        <Main>
            <Formik
                initialValues={{
                    email: "",
                    login: "",
                    first_name: "",
                    second_name: "",
                    display_name: "",
                    phone: "",
                    password: "",
                    password_repeat: "",
                }}
                onSubmit={onSubmit}>
                <AuthenticationForm
                    title={title}
                    buttonTitle={buttonTitle}
                    goToRegistration={goToRegistration}
                    goToHome={goToHome}>
                    {inputs.map(({ id, labelText, type }, index) => {
                        return (
                            <InputForm
                                key={index}
                                name={id}
                                id={id}
                                labelText={labelText}
                                type={type}
                            />
                        );
                    })}
                </AuthenticationForm>
            </Formik>
        </Main>
    );
};