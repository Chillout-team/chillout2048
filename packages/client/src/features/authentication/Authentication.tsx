import { Main } from "@/components/common/main/Main";
import { AuthenticationForm } from "./authenticationForm/AuthenticationForm";
import { InputForm } from "./inputForm/InputForm";
import { AuthenticationData } from "./AuthenticationData";
import { Formik } from "formik";
import { FC } from "react";
import { SinginSchema, SingupSchema } from "@/utils/validator/Validator";
import { authAPI } from "@/api/auth-api";
import { useAppDispatch } from "@/redux/hooks";
import { getUser } from "@/redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/router/routes";

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
    password_repeat: string;
}

export const Authentication: FC<IAuthenticationProps> = ({ mode }) => {
    const { title, goToRegistration, goToHome, buttonTitle, inputs } =
        AuthenticationData[mode];
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onSubmit = async (values: IProfileForm) => {
        try {
            mode === "reg"
                ? await authAPI.signup(values)
                : await authAPI.signin(values);
            const result = await dispatch(getUser());
            if (result.meta.requestStatus === "fulfilled") {
                localStorage.setItem("auth", "true");
                navigate(ROUTES.PROFILE.path);
            }
        } catch (err) {
            console.error(`${(err as Error).message}. Ошибка аутентификации`);
        }
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
                validationSchema={mode === "reg" ? SingupSchema : SinginSchema}
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
