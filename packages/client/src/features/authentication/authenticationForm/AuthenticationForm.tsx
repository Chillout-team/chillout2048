import cls from "./AuthenticationForm.module.scss";
import { Button } from "@/components/common/button/Button";
import { Form } from "formik";
import { Link } from "react-router-dom";
import { ROUTES } from "@/router/routes";
import { oAuth } from "@/api/oAuth";
import { ReactNode } from "react";

type Props = {
    title: string;
    children: ReactNode;
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
                <Button
                    size={"medium"}
                    color={"orange"}
                    type={"button"}
                    subclass={cls.oauth}
                    onClick={() => oAuth.singin()}>
                    Авторизоваться через Яндекс
                </Button>
                {goToRegistration && (
                    <Link className={cls.__green} to={ROUTES.SINGUP.path}>
                        Нет аккаунта?
                    </Link>
                )}
                {goToHome && (
                    <Link className={cls.__orange} to={ROUTES.HOME.path}>
                        Домой
                    </Link>
                )}
            </div>
        </Form>
    );
};
