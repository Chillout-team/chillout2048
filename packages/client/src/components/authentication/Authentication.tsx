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
    return (
        <Main>
            <AuthenticationForm
                title={"Регистрация"}
                buttonTitle={"Авторизоваться"}
                goToRegistration={true}
                goToHome={true}>
                {data[mode].map(({ id, value, labelText, type }) => {
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
