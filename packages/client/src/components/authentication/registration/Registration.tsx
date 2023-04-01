import { Main } from "../../common/main/Main";
import { AuthenticationForm } from "../authenticationForm/AuthenticationForm";
import { InputForm } from "../authenticationForm/inputForm/InputForm";

const data: Record<string, string>[] = [
    {
        id: "email",
        value: "pochta@yandex.ru",
        labelText: "Почта",
    },
    {
        id: "login",
        value: "ivanivanov",
        labelText: "Логин",
    },
    {
        id: "first_name",
        value: "fsdafasdf",
        labelText: "Имя",
    },
    {
        id: "second_name",
        value: "fasdfasdf",
        labelText: "Фамилия",
    },
    {
        id: "phone",
        value: "fasdfasd",
        labelText: "Телефон",
    },
    {
        id: "password",
        value: "fasfsdfasd",
        labelText: "Пароль",
        type: "password",
    },
    {
        id: "password_repite",
        value: "fasdfsadf",
        labelText: "Пароль (ещё раз)",
        type: "password",
    },
];

export const Registration = () => {
    return (
        <Main>
            <AuthenticationForm
                title={"Регистрация"}
                buttonTitle={"Авторизоваться"}
                goToRegistration={true}
                goToHome={true}>
                {data.map(({ id, value, labelText, type = "text" }) => {
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
