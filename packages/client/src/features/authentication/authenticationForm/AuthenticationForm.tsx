import cls from "./AuthenticationForm.module.scss";
import { Button } from "@/components/common/button/Button";
import { Form } from "formik";
import { Link } from "react-router-dom";

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
                    <Link className={cls.__green} to="/singup">
                        Нет аккаунта?
                    </Link>
                )}
                {goToHome && (
                    <Link className={cls.__orange} to="/">
                        Домой
                    </Link>
                )}
            </div>
        </Form>
    );
};
