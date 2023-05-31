import {
    AllowNull,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";

@Table({ modelName: "users" })
export class Users extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.INTEGER)
    user_id!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    login!: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    display_name!: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    avatar!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    theme!: string;
}
