import React, { FC } from "react";
import cls from "./ProfileForm.module.scss";
import { Formik, Form, Field } from "formik";
import { Input } from "@/components/common/input/Input";
import { Button } from "@/components/common/button/Button";
import { Link } from "react-router-dom";
import { changePassword } from "@/controllers/userController";

interface IFormEditPassword {
    toggle: boolean;
    toggleForm: () => void;
}

interface IPasswordForm {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export const FormEditPassword: FC<IFormEditPassword> = ({
    toggle,
    toggleForm,
}) => {
    const initialValues: IPasswordForm = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    };

    const submit = (values: IPasswordForm) => {
        const data = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
        };
        changePassword(data);
        toggleForm();
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
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
                                    ? `${cls.button} ${cls.hidden}`
                                    : cls.button
                            }>
                            <Button
                                size="medium"
                                color="orange"
                                type="submit"
                                children="Сохранить"
                            />
                        </div>
                    </Form>
                )}
            </Formik>

            <Link
                className={
                    toggle ? `${cls.link_back} ${cls.hidden}` : cls.link_back
                }
                to={""}
                onClick={toggleForm}>
                Назад
            </Link>
        </>
    );
};
