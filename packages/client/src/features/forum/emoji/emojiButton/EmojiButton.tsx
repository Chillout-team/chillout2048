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
            <button
                className={cls.emoji}
                type="button"
                onClick={() => addEmoji("👍")}>
                👍
            </button>
            <button
                className={cls.emoji}
                type="button"
                onClick={() => addEmoji("👎")}>
                👎
            </button>
            <button
                className={cls.emoji}
                type="button"
                onClick={() => addEmoji("❤️")}>
                ❤️
            </button>
            <button
                className={cls.emoji}
                type="button"
                onClick={() => addEmoji("🔥")}>
                🔥
            </button>
        </div>
    );
};
