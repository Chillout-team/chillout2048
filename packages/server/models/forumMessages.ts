import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { Users } from "./users";
import { ForumTopics } from "./forumTopics";

@Table({ modelName: "messages" })
export class ForumMessages extends Model {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    message_id!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    message!: string;

    @ForeignKey(() => Users)
    @AllowNull(false)
    @Column
    user_id!: number;

    @ForeignKey(() => ForumTopics)
    @AllowNull(false)
    @Column
    topic_id!: number;

    @BelongsTo(() => ForumTopics)
    topic!: ForumTopics;

    @BelongsTo(() => Users)
    user!: Users;

    @Column(DataType.TIME)
    override createdAt!: string;
}
