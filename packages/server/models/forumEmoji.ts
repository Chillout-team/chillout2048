import {
    AllowNull,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
    BelongsTo,
} from "sequelize-typescript";
import { ForumMessages } from "./forumMessages";
import { Users } from "./users";

@Table({ modelName: "emoji" })
export class ForumEmoji extends Model {
    @ForeignKey(() => ForumMessages)
    @AllowNull(false)
    @Column
    message_id!: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    topic_id!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    emoji!: string;

    @BelongsTo(() => Users)
    user!: Users[];
}
