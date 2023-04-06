import cls from "./AuthenticationForm.module.scss";
import { Button } from "@/components/common/button/Button";
import { Form } from "formik";

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
        <Form className={cls.form}>
            <div>
                <h1>{title}</h1>
                {children}
            </div>
            <div>
                <Button size={"medium"} color={"green"} type={"submit"}>
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
        </Form>
    );
};
