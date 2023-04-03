import React, { Dispatch, FC, SetStateAction } from "react";
import cls from "./ProfileForm.module.scss";
import { Formik, Form, Field } from "formik";
import { Input } from "../../common/input/Input";
import { Button } from "../../common/button/Button";
import { Link } from "react-router-dom";
import { IUserData } from "../../../types/types";
import { changeProfile } from "../../../controllers/userController";

interface IFormEditProfile
    extends Omit<React.HTMLProps<HTMLDivElement>, "size"> {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    toggle: boolean;
    setLogin: Dispatch<SetStateAction<string>>;
    onToggle: () => void;
}

export const FormEditProfile: FC<IFormEditProfile> = props => {
    const { toggle, onToggle } = props;

    const initialValues = {
        email: props.email,
        login: props.login,
        first_name: props.first_name,
        second_name: props.second_name,
        display_name: props.display_name,
        phone: props.phone,
    };

    const submit = (values: IUserData) => {
        changeProfile(values).then(data => {
            if (data) props.setLogin(data.login);
            console.log(data);
        });
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
                            name="email"
                            type="email"
                            id="email"
                            disabled={toggle}
                            labelText="Почта"
                            labelClassName={cls.label}
                            inputClassName={cls.input}
                            containerClassName={cls.item}
                            component={Input}
                        />

                        <Field
                            name="login"
                            type="text"
                            id="login"
                            disabled={toggle}
                            labelText="Логин"
                            labelClassName={cls.label}
                            inputClassName={cls.input}
                            containerClassName={cls.item}
                            component={Input}
                        />

                        <Field
                            name="first_name"
                            type="text"
                            id="first_name"
                            disabled={toggle}
                            labelText="Имя"
                            labelClassName={cls.label}
                            inputClassName={cls.input}
                            containerClassName={cls.item}
                            component={Input}
                        />

                        <Field
                            name="second_name"
                            type="text"
                            id="second_name"
                            disabled={toggle}
                            labelText="Фамилия"
                            labelClassName={cls.label}
                            inputClassName={cls.input}
                            containerClassName={cls.item}
                            component={Input}
                        />

                        <Field
                            name="display_name"
                            type="text"
                            id="display_name"
                            disabled={toggle}
                            labelText="Имя в чате"
                            labelClassName={cls.label}
                            inputClassName={cls.input}
                            containerClassName={cls.item}
                            component={Input}
                        />

                        <Field
                            name="phone"
                            type="text"
                            id="phone"
                            disabled={toggle}
                            labelText="Телефон"
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
                                onClick={onToggle}
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
                onClick={onToggle}>
                Назад
            </Link>
        </>
    );
};
