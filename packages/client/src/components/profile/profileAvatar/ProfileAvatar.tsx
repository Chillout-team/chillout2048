import { FC, useState } from "react";
import cls from "./ProfileAvatar.module.scss";
import { NoPic } from "../../../assets/img/NoPic";
import { Modal } from "../../common/popup/Modal";
import { Field, Form, Formik } from "formik";
import { Button } from "../../common/button/Button";

interface IAvatarForm {
    avatar: string;
}

export const ProfileAvatar: FC = () => {
    const [modalActive, setModalActive] = useState(false);
    const [modalFile, setmodalFile] = useState("");

    const selectFile = (e: React.FormEvent<HTMLInputElement>) =>
        setmodalFile(e.currentTarget.value);

    const submit = (
        values: IAvatarForm,
        { setSubmitting }: { setSubmitting: (issubmitting: boolean) => void },
    ) => {
        console.log({ values, setSubmitting });
    };

    return (
        <div>
            <a className={cls.link} onClick={() => setModalActive(true)}>
                <NoPic class={cls.avatar} />
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
                    initialValues={{
                        avatar: "",
                    }}
                    onSubmit={submit}>
                    {() => (
                        <Form className={cls.form}>
                            <p className={cls.modal_file}>{modalFile}</p>
                            <Field
                                name="avatar"
                                type="file"
                                id="avatar"
                                onChange={selectFile}
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
