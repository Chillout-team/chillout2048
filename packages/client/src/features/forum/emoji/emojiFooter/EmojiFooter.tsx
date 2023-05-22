import { FC, useEffect, useState } from "react";
import cls from "./EmojiFooter.module.scss";
import { Emoji } from "@/types/types";
import { EmojiCount } from "./emojiItem/EmojiItem";
import { useAuthorization } from "@/hooks/useAuthorization";
import { AddEmoji } from "./addEmoji/AddEmoji";

interface Props {
    emojis: Emoji[];
}

export const EmojiFooter: FC<Props> = ({ emojis }) => {
    const { userData } = useAuthorization();
    const [changes, setChanges] = useState(false);

    useEffect(() => {
        setChanges(false);
    }, [changes]);

    return (
        <div className={cls.emojiList}>
            {emojis.map((item, index) => {
                if (item.users.length) {
                    return (
                        <div className={cls.emoji} key={index}>
                            <EmojiCount
                                emoji={item}
                                userId={userData.id}
                                setChanges={setChanges}
                            />
                        </div>
                    );
                }
            })}
            <AddEmoji
                emojis={emojis}
                userId={userData.id}
                setChanges={setChanges}
            />
        </div>
    );
};
