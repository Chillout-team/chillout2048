import { FC } from "react";
import cls from "./ProfileForm.module.scss";
import { Formik, Form, Field } from "formik";
import { Input } from "@/components/common/input/Input";
import { Button } from "@/components/common/button/Button";
import { Link } from "react-router-dom";
import { IUserData } from "@/types/types";
import { ProfileSchema } from "@/utils/validator/Validator";
import { changeProfile } from "@/redux/actions/userAction";
import { useAppDispatch } from "@/redux/hooks";
import { useAuthorization } from "@/hooks/useAuthorization";

interface IFormEditProfile {
    toggle: boolean;
    onToggle: () => void;
}

export const FormEditProfile: FC<IFormEditProfile> = ({ toggle, onToggle }) => {
    const dispatch = useAppDispatch();

    const {
        userData: {
            email = "",
            login = "",
            first_name = "",
            second_name = "",
            display_name = "",
            phone = "",
        },
    } = useAuthorization();

    const onSubmit = (values: IUserData) => {
        dispatch(changeProfile(values));
        onToggle();
    };

    return (
        <>
            <Formik
                initialValues={{
                    email: email || '',
                    login: login || '',
                    first_name: first_name || '',
                    second_name: second_name ||'',
                    display_name: display_name || '',
                    phone: phone || '',
                }}
                enableReinitialize={true}
                validationSchema={ProfileSchema}
                onSubmit={onSubmit}>
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
                            errorClassName={cls.error_label}
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
                            errorClassName={cls.error_label}
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
                            errorClassName={cls.error_label}
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
                            errorClassName={cls.error_label}
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
                            errorClassName={cls.error_label}
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
                            errorClassName={cls.error_label}
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
                to=""
                onClick={onToggle}>
                Назад
            </Link>
        </>
    );
};
