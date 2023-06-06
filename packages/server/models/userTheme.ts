import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";

@Table({
    timestamps: false,
    paranoid: true,
    tableName: "user_theme",
})
export class UserTheme extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    override id!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    theme!: string;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    themeId!: number;
}
