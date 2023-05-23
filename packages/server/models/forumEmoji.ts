import { AllowNull, AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ForumMessages } from "./forumMessages";

@Table({ modelName: 'emoji' })
export class ForumEmoji extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  emoji_id!: number;

  @ForeignKey(() => ForumMessages)
  @AllowNull(false)
  @Column
  message_id!: number;
  
  @AllowNull(false)
  @Column(DataType.STRING)
  emoji!: string;
}
