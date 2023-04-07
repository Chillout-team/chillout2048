import { FC, SyntheticEvent, useState } from "react";
import { Button } from "../../../components/common/button/Button";
import { TextArea } from "../../../components/common/textarea/TextArea";
import cls from "./ForumForm.module.scss";

interface IForumFormProps {
    type: "message" | "topic";
}

/** Компонент формы форума. */
export const ForumForm: FC<IForumFormProps> = ({ type }) => {
    const [formText, setFormText] = useState("");
    const [errorText, setErrorText] = useState("");

    const onChangeTextarea = (event: SyntheticEvent<HTMLTextAreaElement>) => {
        const target = event.target as HTMLTextAreaElement;
        setFormText(target.value);
    };

    const onSubmitForm = (event: React.FormEvent): void => {
        event.preventDefault();
        if (formText.trim()) {
            console.log("Отправить текст:", formText);
            setFormText("");
            setErrorText("");
        } else {
            setErrorText("Введите текст");
        }
    };

    const formInfo = {
        message: {
            placeholder: "Ваш комментарий...",
            title: "Комментарий",
            buttonText: "Отправить",
        },
        topic: {
            placeholder: "Название темы...",
            title: "Новая тема",
            buttonText: "Создать",
        },
    }[type];

    return (
        <section className={cls.forumForm}>
            <header className={cls.formHeader}>
                <h2 className={cls.formTitle}>{formInfo.title}</h2>
            </header>
            <div className={cls.formBody}>
                <form>
                    <TextArea
                        placeholder={formInfo.placeholder}
                        onChange={onChangeTextarea}
                        errorText={errorText}
                        value={formText}
                    />
                    <div className={cls.forumAdd}>
                        <Button
                            size="small"
                            color="orange"
                            type="submit"
                            onClick={onSubmitForm}>
                            {formInfo.buttonText}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};
