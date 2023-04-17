import { FC, useState } from "react";
import cls from "./ProfileAvatar.module.scss";
import { Modal } from "@/components/common/popup/Modal";
import { Field, Form, Formik } from "formik";
import { Button } from "@/components/common/button/Button";
import { useAppDispatch } from "@/redux/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { changeAvatar } from "@/redux/actions/userAction";

export const ProfileAvatar: FC = () => {
    const [modalActive, setModalActive] = useState(false);
    const avatar = useSelector((state: RootState) => state.user.user?.avatar || "");
    const dispatch = useAppDispatch();

    const initialValues = {
        avatar: "",
    };

    const onSubmit = (values: { avatar: string }) => {
        values;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        dispatch(changeAvatar(formData));

        setModalActive(false);
    };

    return (
        <div>
            <a className={cls.link} onClick={() => setModalActive(true)}>
                <img
                    className={cls.avatar}
                    src={avatar}
                    alt="Avatar"
                    width="130"
                    height="130"
                />
                <span className={cls.text}>
                    Поменять
                    <br />
                    аватар
                </span>
            </a>
            <Modal
                active={modalActive}
                setActive={setModalActive}
                title="Загрузите файл">
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={onSubmit}>
                    {() => (
                        <Form className={cls.form} onSubmit={handleSubmit}>
                            <Field
                                name="avatar"
                                type="file"
                                id="avatar"
                                className={cls.modal_input}
                            />

                            <label htmlFor="avatar" className={cls.modal_lable}>
                                Выбрать файл на
                                <br />
                                компьютере
                            </label>

                            <div className={cls.modal_button}>
                                <Button
                                    size="medium"
                                    color="green"
                                    type="submit"
                                    children="Сохранить"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </div>
    );
};
