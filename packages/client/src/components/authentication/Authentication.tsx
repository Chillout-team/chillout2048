import { Main } from "../common/main/Main";
import { AuthenticationForm } from "./authenticationForm/AuthenticationForm";
import { InputForm } from "./inputForm/InputForm";
import { reg, auth } from "./AuthenticationData";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { AuthRequest } from "../../store/AuthSlice";
import { AppDispatch } from "../../store/Store";

const data = {
    reg,
    auth,
};

type Props = {
    mode: "auth" | "reg";
};

interface IProfileForm {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
}

export const Authentication = (props: Props) => {
    const { mode } = props;
    const { title, goToRegistration, goToHome, buttonTitle, inputs } =
        data[mode];

    const useAuthDispatch: () => AppDispatch = useDispatch;
    const dispatch = useAuthDispatch();

    const submit = (values: IProfileForm) => {
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
                }}
                onSubmit={submit}>
                <AuthenticationForm
                    title={title}
                    buttonTitle={buttonTitle}
                    goToRegistration={goToRegistration}
                    goToHome={goToHome}>
                    {inputs.map(({ id, labelText, type }, index) => {
                        return (
                            <InputForm
                                key={index}
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
