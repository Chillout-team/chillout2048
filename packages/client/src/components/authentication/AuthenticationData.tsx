type InputData = {
    id: string;
    value: string;
    labelText: string;
    type?: "email" | "password" | "text" | undefined;
};

export const reg: InputData[] = [
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
        id: "password_repite",
        value: "fasdfsadf",
        labelText: "Пароль (ещё раз)",
        type: "password",
    },
];

export const auth: InputData[] = [
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
];
