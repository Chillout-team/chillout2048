import { FC, SyntheticEvent, useState } from "react";
import { Button } from "../../common/button/Button";
import { TextArea } from "../../common/textarea/TextArea";
import cls from "./ForumForm.module.scss";

interface IForumFormProps {
    type: "message" | "topic";
}

/** Компонент формы форума. */
export const ForumForm: FC<IForumFormProps> = ({ type }) => {
    const [formText, setFormText] = useState("");
    const [errorText, setErrorText] = useState("");

    /** Обработчик изменения поля textarea. */
    const onChangeTextarea = (event: SyntheticEvent<HTMLTextAreaElement>) => {
        const target = event.target as HTMLTextAreaElement;
        setFormText(target.value);
    };

    /** Обработчик отправки формы. */
    const onSubmitForm = (event: React.FormEvent): void => {
        event.preventDefault();
        if (formText.trim()) {
            console.log("Отправить текст:", formText);
            setErrorText("");
        } else {
            setErrorText("Введите текст");
        }
    };

    let placeholder: string;
    let title: string;
    let buttonText: string;

    if (type === "message") {
        placeholder = "Ваш комментарий...";
        title = "Комментарий";
        buttonText = "Отправить";
    } else {
        placeholder = "Название темы...";
        title = "Новая тема";
        buttonText = "Создать";
    }

    return (
        <section className={cls.forumForm}>
            <header className={cls.formHeader}>
                <h2 className={cls.formTitle}>{title}</h2>
            </header>
            <div className={cls.formBody}>
                <form>
                    <TextArea
                        placeholder={placeholder}
                        onChange={onChangeTextarea}
                        errorText={errorText}
                    />
                    <div className={cls.forumAdd}>
                        <Button
                            size="small"
                            color="orange"
                            type="submit"
                            onClick={onSubmitForm}>
                            {buttonText}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};
