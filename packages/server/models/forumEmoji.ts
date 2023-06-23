import {
    AllowNull,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import { ForumTopics } from "./forumTopics";
@Table({ modelName: "emojis" })
export class Emojis extends Model {
    @AllowNull(false)
    @Column
    message_id!: number;

    @ForeignKey(() => ForumTopics)
    @AllowNull(false)
    @Column
    topic_id!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    emoji!: string;

    @AllowNull(false)
    @Column(DataType.ARRAY(DataType.INTEGER))
    users_id!: number[];
}
