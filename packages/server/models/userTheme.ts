import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { SiteTheme } from "./SiteTheme";

@Table({
    timestamps: false,
    paranoid: true,
    tableName: "user_theme",
})
export class UserTheme extends Model<UserTheme> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    override id!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    theme!: string;

    @ForeignKey(() => SiteTheme)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    themeId!: string;
}
