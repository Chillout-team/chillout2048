type InputData = {
    id: string;
    value: string;
    labelText: string;
    type?: "email" | "password" | "text" | undefined;
};

type AuthenticationForm = {
    title: string;
    buttonTitle: string;
    goToRegistration: boolean;
    goToHome: boolean;
    inputs: InputData[];
};

export const AuthenticationData: Record<string, AuthenticationForm> = {
    reg: {
        title: "Регистрация",
        buttonTitle: "Зарегистрироваться",
        goToRegistration: true,
        goToHome: false,
        inputs: [
            {
                id: "email",
                value: "pochta@yandex.ru",
                labelText: "Почта",
                type: "email",
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
                id: "password_repeat",
                value: "fasdfsadf",
                labelText: "Пароль (ещё раз)",
                type: "password",
            },
        ],
    },
    auth: {
        title: "Вход",
        buttonTitle: "Авторизоваться",
        goToRegistration: true,
        goToHome: true,
        inputs: [
            {
                id: "login",
                value: "ivanivanov",
                labelText: "Логин",
            },
            {
                id: "password",
                value: "fasfsdfasd",
                labelText: "Пароль",
                type: "password",
            },
        ],
    },
};
