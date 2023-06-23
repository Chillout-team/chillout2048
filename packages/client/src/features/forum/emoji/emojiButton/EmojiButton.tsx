import { EmojiList } from "../EmojiList";
import cls from "./EmojiButton.module.scss";
import { FC } from "react";
import { Dispatch } from "react";

type Props = {
    text: string;
    setText: Dispatch<string>;
};

export const EmojiButton: FC<Props> = ({ text, setText }) => {
    const addEmoji = (str: string) => {
        setText(`${text}${str}`);
    };

    return (
        <div className={cls.emojiWrapper}>
            {EmojiList.map((emoji, index) => {
                return (
                    <button
                        key={index}
                        className={cls.emoji}
                        type="button"
                        onClick={() => addEmoji(emoji)}>
                        {emoji}
                    </button>
                );
            })}
        </div>
    );
};
