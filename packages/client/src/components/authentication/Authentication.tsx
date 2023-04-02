import { Main } from "../common/main/Main";
import { AuthenticationForm } from "./authenticationForm/AuthenticationForm";
import { InputForm } from "./inputForm/InputForm";
import { reg, auth } from "./AuthenticationData";

const data = {
    reg,
    auth,
};

type Props = {
    mode: "auth" | "reg";
};

export const Authentication = (props: Props) => {
    const { mode } = props;
    const { title, goToRegistration, goToHome, buttonTitle, inputs } =
        data[mode];
    return (
        <Main>
            <AuthenticationForm
                title={title}
                buttonTitle={buttonTitle}
                goToRegistration={goToRegistration}
                goToHome={goToHome}>
                {inputs.map(({ id, value, labelText, type }) => {
                    return (
                        <InputForm
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
        </Main>
    );
};
