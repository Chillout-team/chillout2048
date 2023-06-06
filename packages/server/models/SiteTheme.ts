import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    Index,
    Model,
    PrimaryKey,
    Table,
    Unique,
} from "sequelize-typescript";

@Table({
    timestamps: false,
    paranoid: true,
    tableName: "site_theme",
})
export class SiteTheme extends Model<SiteTheme> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    override id!: number;

    @Index
    @AllowNull(true)
    @Unique
    @Column(DataType.STRING)
    theme!: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    description!: string;
}
