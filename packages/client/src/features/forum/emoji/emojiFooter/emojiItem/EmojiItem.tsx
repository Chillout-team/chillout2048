import { FC } from "react";
import { Emoji } from "@/types/types";
import cls from "./EmojiItem.module.scss";

type Props = {
    emoji: Emoji;
    userId: number | null | undefined;
    // eslint-disable-next-line no-unused-vars
    apiUpdateEmoji: (content: string) => void;
};

export const EmojiCount: FC<Props> = ({ emoji, apiUpdateEmoji }) => {
    const { users } = emoji;

    const updateEmoji = () => {
        apiUpdateEmoji(emoji.content);
    };
    return (
        <>
            <div className={cls.emojiCount}>{users.length}</div>
            <div className={cls.emojiContent} onClick={() => updateEmoji()}>
                {emoji.content}
            </div>
        </>
    );
};
