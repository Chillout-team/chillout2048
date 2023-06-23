import { FC } from "react";
import cls from "./ProfileForm.module.scss";
import { Formik, Form, Field } from "formik";
import { Input } from "@/components/common/input/Input";
import { Button } from "@/components/common/button/Button";
import { Link } from "react-router-dom";
import { NewPasswordSchema } from "@/utils/validator/Validator";
import { changePassword } from "@/redux/actions/userAction";
import { useAppDispatch } from "@/redux/hooks";

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
    const dispatch = useAppDispatch();

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
        dispatch(changePassword(data));
        toggleForm();
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={NewPasswordSchema}
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
                            errorClassName={cls.error_label}
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
                            errorClassName={cls.error_label}
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
                onClick={toggleForm}>
                Назад
            </Link>
        </>
    );
};
