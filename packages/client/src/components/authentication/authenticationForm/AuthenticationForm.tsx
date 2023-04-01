import cls from "./AuthenticationForm.module.scss";
import { Button } from "../../common/button/Button";

type Props = {
    title: string;
    children: React.ReactNode;
    buttonTitle: string;
    goToRegistration: boolean;
    goToHome: boolean;
};

export const AuthenticationForm = (props: Props) => {
    const { children, buttonTitle, goToRegistration, goToHome, title } = props;
    return (
        <form action="" className={cls.form}>
            <div>
                <h1>{title}</h1>
                {children}
            </div>
            <div>
                <Button
                    onClick={() => {
                        console.log("click");
                    }}
                    size={"medium"}
                    color={"green"}
                    type={"submit"}>
                    {buttonTitle}
                </Button>
                {goToRegistration && (
                    <a href="" className={cls.__green}>
                        Нет аккаунта?
                    </a>
                )}
                {goToHome && (
                    <a href="" className={cls.__orange}>
                        Домой
                    </a>
                )}
            </div>
        </form>
    );
};
