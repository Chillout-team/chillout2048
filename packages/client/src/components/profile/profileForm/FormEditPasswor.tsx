import React, { FC } from "react";
import cls from "./ProfileForm.module.scss";
import { Formik, Form, Field } from "formik";
import { Input } from "../../common/input/Input";
import { Button } from "../../common/button/Button";
import { Link } from "react-router-dom";

interface IFormEditPassword
    extends Omit<React.HTMLProps<HTMLDivElement>, "size"> {
    toggle: boolean;
    toggleForm: () => void;
}

interface IPasswordForm {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export const FormEditPassword: FC<IFormEditPassword> = props => {
    const { toggle, toggleForm } = props;

    const submit = (
        values: IPasswordForm,
        { setSubmitting }: { setSubmitting: (issubmitting: boolean) => void },
    ) => {
        console.log({ values, setSubmitting });
    };

    return (
        <>
            <Formik
                initialValues={{
                    oldPassword: "hhhhh",
                    newPassword: "",
                    confirmPassword: "",
                }}
                onSubmit={submit}>
                {() => (
                    <Form className={cls.form}>
                        <Field
                            name="oldPassword"
                            type="password"
                            id="oldPassword"
                            labelText="Старый пароль"
                            labelClassName={cls.label}
                            inputClassName={cls.input}
                            containerClassName={cls.item}
                            component={Input}
                        />

                        <Field
                            name="newPassword"
                            type="password"
                            id="newPassword"
                            labelText="Новый пароль"
                            labelClassName={cls.label}
                            inputClassName={cls.input}
                            containerClassName={cls.item}
                            component={Input}
                        />

                        <Field
                            name="confirmPassword"
                            type="password"
                            id="confirmPassword"
                            labelText="Повторите новый пароль"
                            labelClassName={cls.label}
                            inputClassName={cls.input}
                            containerClassName={cls.item}
                            component={Input}
                        />

                        <div
                            className={
                                toggle
                                    ? cls.button + " " + cls.hidden
                                    : cls.button
                            }>
                            <Button
                                size="medium"
                                color="orange"
                                type="submit"
                                onClick={toggleForm}
                                children="Сохранить"
                            />
                        </div>
                    </Form>
                )}
            </Formik>

            <Link
                className={
                    toggle ? cls.link_back + " " + cls.hidden : cls.link_back
                }
                to={""}
                onClick={toggleForm}>
                Назад
            </Link>
        </>
    );
};
