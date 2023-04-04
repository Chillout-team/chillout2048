import { Dispatch, FC, SetStateAction, useState } from "react";
import cls from "./ProfileAvatar.module.scss";
import { Modal } from "../../common/popup/Modal";
import { Field, Form, Formik } from "formik";
import { Button } from "../../common/button/Button";
import { changeAvatar } from "../../../controllers/userController";
import { YANDEX_API_URL } from "../../../consts/common";

interface IAvatarForm {
    avatar?: string;
    setAvatar: Dispatch<SetStateAction<string>>;
}

export const ProfileAvatar: FC<IAvatarForm> = ({avatar, setAvatar}) => {
    const [modalActive, setModalActive] = useState(false);

    const initialValues = {
        avatar: "",
    };

    const submit = (values: { avatar: string }) => { values; };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        changeAvatar(formData).then(data => {
            setAvatar(`${YANDEX_API_URL}resources${data.avatar}`);
        });

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
                    onSubmit={submit}>
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
                                    onClick={() => {
                                        return;
                                    }}
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
