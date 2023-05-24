import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { Users } from "./users";
import { ForumMessages } from "./forumMessages";

@Table({ modelName: "topics" })
export class ForumTopics extends Model {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    topic_id!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;

    @ForeignKey(() => Users)
    @AllowNull(false)
    @Column
    user_id!: number;

    @BelongsTo(() => Users)
    user!: Users;

    @HasMany(() => ForumMessages, "topic_id")
    messages!: ForumMessages[];
}
