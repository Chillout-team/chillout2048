import { Main } from "../common/main/Main";
import { AuthenticationForm } from "./authenticationForm/AuthenticationForm";
import { InputForm } from "./inputForm/InputForm";
import { reg, auth } from "./AuthenticationData";
import { Formik } from "formik";

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

    const submit = (
        values: IProfileForm,
        { setSubmitting }: { setSubmitting: (issubmitting: boolean) => void },
    ) => {
        console.log({ values, setSubmitting });
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
                    {inputs.map(({ id, value, labelText, type }, index) => {
                        return (
                            <InputForm
                                key={index}
                                id={id}
                                value={value}
                                labelText={labelText}
                                type={type}
                                onChange={() => {
                                    console.log("click");
                                }}
                            />
                        );
                    })}
                </AuthenticationForm>
            </Formik>
        </Main>
    );
};
