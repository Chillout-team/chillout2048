import { FC } from "react";
import { Emoji } from "@/types/types";
import cls from "./EmojiItem.module.scss";

type Props = {
    emoji: Emoji;
    user_id?: number | null;
    apiUpdateEmoji: (content: string) => void;
};

export const EmojiCount: FC<Props> = ({ emoji, apiUpdateEmoji }) => {
    const { users_id } = emoji;

    const updateEmoji = () => {
        apiUpdateEmoji(emoji.emoji);
    };
    return (
        <>
            <div className={cls.emojiCount}>{users_id.length}</div>
            <div className={cls.emojiContent} onClick={() => updateEmoji()}>
                {emoji.emoji}
            </div>
        </>
    );
};
