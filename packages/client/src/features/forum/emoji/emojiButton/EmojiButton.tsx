import { EmojiList } from "../EmojiList";
import cls from "./emojiButton.module.scss";

type Props = {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
};

export const EmojiButton = (props: Props) => {
    const { text, setText } = props;
    function addEmoji(str: string) {
        setText(`${text}${str}`);
    }

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
