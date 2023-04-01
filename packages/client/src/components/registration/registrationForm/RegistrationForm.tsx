import cls from "./RegistrationForm.module.scss";
import { Button } from "../../common/button/Button";
import { InputForm } from "./inputForm/InputForm";

export const RegistrationForm = () => {
    return (
        <form action="" className={cls.form}>
            <div>
                <h1>Вход</h1>
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
            </div>
            <div>
                <Button
                    onClick={() => {
                        console.log("click");
                    }}
                    size={"medium"}
                    color={"green"}
                    type={"submit"}>
                    Авторизоваться
                </Button>
                <a href="" className={cls.__green}>
                    Нет аккаунта?
                </a>
                <a href="" className={cls.__orange}>
                    Домой
                </a>
            </div>
        </form>
    );
};
