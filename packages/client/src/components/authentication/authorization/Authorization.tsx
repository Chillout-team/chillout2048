import { Main } from "../../common/main/Main";
import { AuthenticationForm } from "../authenticationForm/AuthenticationForm";
import { InputForm } from "../authenticationForm/inputForm/InputForm";

export const Authorization = () => {
    return (
        <Main>
            <AuthenticationForm
                title={"Вход"}
                buttonTitle={"Авторизоваться"}
                goToRegistration={true}
                goToHome={true}>
                <InputForm
                    id={"login"}
                    value={"ivanivanov"}
                    labelText="Логин"
                    onChange={() => {
                        console.log("click");
                    }}
                />
                <InputForm
                    id={"password"}
                    value={"••••••••••••"}
                    labelText="Пароль"
                    onChange={() => {
                        console.log("click");
                    }}
                />
            </AuthenticationForm>
        </Main>
    );
};
