import cls from "./AddEmoji.module.scss";
import { EmojiList } from "../../EmojiList";
import { FC } from "react";
import { Emoji } from "@/types/types";

type Props = {
    emojis: Emoji[];
    userId: number | null | undefined;
    setChanges: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddEmoji: FC<Props> = ({ emojis, userId, setChanges }) => {
    function addNewEmoji(targetEmoji: string) {
        const checkIndexEmoji: number = emojis.findIndex(item => {
            console.log(item.content);
            return item.content === targetEmoji;
        });
        console.log(emojis);

        if (userId) {
            if (emojis[checkIndexEmoji]) {
                const checkUserId = emojis[checkIndexEmoji].users.findIndex(
                    id => {
                        return id === userId;
                    },
                );
                if (!emojis[checkIndexEmoji].users[checkUserId]) {
                    emojis[checkIndexEmoji].users.push(userId);
                    setChanges(true);
                }
            } else {
                emojis.push({
                    content: targetEmoji,
                    users: [userId],
                });
                setChanges(true);
            }
        }
    }

    return (
        <div className={cls.addEmoji}>
            <svg
                stroke="currentColor"
                viewBox="0 0 20 20"
                role="button"
                width="27"
                height="27"
                focusable="false"
                fill="currentColor">
                <g
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path
                        d="M11.53 3.17a7 7 0 1 0 5.37 5.65"
                        strokeWidth="1.6"></path>
                    <path
                        d="M7.2 11.4s1.05 1.4 2.8 1.4c1.75 0 2.8-1.4 2.8-1.4"
                        strokeWidth="1.6"></path>
                    <path strokeWidth="2" d="M7.9 7.9h0m4.2 0h0"></path>
                    <path d="M16 2v4m-2-2h4" strokeWidth="1.6"></path>
                </g>
            </svg>
            <div className={cls.emojiContainer}>
                {EmojiList.map((emoji, index) => {
                    return (
                        <div
                            key={index}
                            className={cls.emoji}
                            onClick={() => addNewEmoji(emoji)}>
                            {emoji}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
