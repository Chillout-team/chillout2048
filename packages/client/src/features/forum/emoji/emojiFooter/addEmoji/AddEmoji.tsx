import cls from "./AddEmoji.module.scss";
import { EmojiList } from "../../EmojiList";
import { FC } from "react";

type Props = {
    // eslint-disable-next-line no-unused-vars
    apiUpdateEmoji: (content: string) => void;
};

export const AddEmoji: FC<Props> = ({ apiUpdateEmoji }) => {
    const addNewEmoji = (targetEmoji: string) => {
        apiUpdateEmoji(targetEmoji);
    };

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
