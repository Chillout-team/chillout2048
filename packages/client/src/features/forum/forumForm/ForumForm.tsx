import { FC, SyntheticEvent, useState } from "react";
import { Button } from "@/components/common/button/Button";
import { TextArea } from "@/components/common/textarea/TextArea";
import cls from "./ForumForm.module.scss";
import { EmojiButton } from "../emoji/emojiButton/EmojiButton";
import { forumAPI } from "@/api/forum";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IUserData } from "@/types/types";
import { Dispatch } from "react";

interface IForumFormProps {
    type: "message" | "topic";
    setUpdate: Dispatch<boolean>;
}

/** Компонент формы форума. */
export const ForumForm: FC<IForumFormProps> = ({ type, setUpdate }) => {
    const [formText, setFormText] = useState("");
    const [errorText, setErrorText] = useState("");

    const onChangeTextarea = (event: SyntheticEvent<HTMLTextAreaElement>) => {
        const target = event.target as HTMLTextAreaElement;
        setFormText(target.value);
    };

    const { id } = useParams();

    const userData: IUserData | null = useSelector(
        (state: RootState) => state.user?.user,
    );

    const onSubmitForm = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        if (formText.trim() && userData) {
            if (type === "message" && id) {
                const data = {
                    topic_id: id,
                    message: formText.trim(),
                    user: userData,
                };
                try {
                    const res = await forumAPI.sendMessage(data);
                    // if (res === "OK") {
                    setUpdate(true);
                    // }
                } catch (error) {
                    console.log(error);
                }
            } else if (type === "topic") {
                const data = {
                    name: formText.trim(),
                    user: userData,
                };
                try {
                    const res = await forumAPI.createNewTopic(data);
                    // if (res === "OK") {
                    setUpdate(true);
                    // }
                } catch (error) {
                    console.log(error);
                }
            }
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
            <form className={cls.formBody}>
                <TextArea
                    placeholder={formInfo.placeholder}
                    onChange={onChangeTextarea}
                    errorText={errorText}
                    value={formText}
                />
                <div className={cls.forumAdd}>
                    <EmojiButton text={formText} setText={setFormText} />
                    <Button
                        size="small"
                        color="orange"
                        type="submit"
                        onClick={onSubmitForm}>
                        {formInfo.buttonText}
                    </Button>
                </div>
            </form>
        </section>
    );
};
