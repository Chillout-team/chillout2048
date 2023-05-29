import { FC, useState, useEffect } from "react";
import cls from "./EmojiFooter.module.scss";
import { Emoji } from "@/types/types";
import { EmojiCount } from "./emojiItem/EmojiItem";
import { useAuthorization } from "@/hooks/useAuthorization";
import { AddEmoji } from "./addEmoji/AddEmoji";
import { forumAPI } from "@/api/forum";

interface Props {
    emojis: Emoji[];
    topic_id: string;
    message_id: string;
}

export const EmojiFooter: FC<Props> = ({ emojis, topic_id, message_id }) => {
    const { userData } = useAuthorization();
    const [actualEmojis, setActualEmojis] = useState<Emoji[]>(emojis);

    const apiUpdateEmoji = async (content: string) => {
        if (content.trim() && userData.id) {
            const data = {
                content: content,
                topic_id,
                message_id,
                userId: userData.id,
            };
            try {
                const res = await forumAPI.updateEmoji(data);
                if (res) {
                    setActualEmojis(res);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        setActualEmojis(emojis);
    }, [emojis]);

    return (
        <div className={cls.emojiList}>
            {actualEmojis.map((item, index) => {
                if (item.users.length) {
                    return (
                        <div className={cls.emoji} key={index}>
                            <EmojiCount
                                emoji={item}
                                userId={userData.id}
                                apiUpdateEmoji={apiUpdateEmoji}
                            />
                        </div>
                    );
                }
            })}
            <AddEmoji apiUpdateEmoji={apiUpdateEmoji} />
        </div>
    );
};
