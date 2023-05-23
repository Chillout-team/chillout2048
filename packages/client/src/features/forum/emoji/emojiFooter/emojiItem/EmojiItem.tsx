import { FC } from "react";
import { Emoji } from "@/types/types";
import cls from "./EmojiItem.module.scss";

type Props = {
    emoji: Emoji;
    userId: number | null | undefined;
    setChanges: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EmojiCount: FC<Props> = ({ emoji, userId, setChanges }) => {
    const { users } = emoji;

    const updateEmoji = () => {
        if (userId) {
            const indexUserId = users.findIndex(
                targetId => targetId === userId,
            );
            if (users[indexUserId]) {
                users.splice(indexUserId, 1);
            } else {
                users.push(userId);
            }
            setChanges(true);
        }
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
