import { ForumEmoji } from "./models/forumEmoji";
import { ForumMessages } from "./models/forumMessages";
import { ForumTopics } from "./models/forumTopics";
import { Users } from "./models/users";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { UserTheme } from "./models/userTheme";

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } =
    process.env;

const sequelizeOptions: SequelizeOptions = {
    host: POSTGRES_HOST,
    //host: "localhost",
    port: Number(POSTGRES_PORT),
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    dialect: "postgres",
    models: [Users, ForumTopics, ForumMessages, ForumEmoji, UserTheme],
};

export const sequelize = new Sequelize(sequelizeOptions);

export async function postgreDBConnect() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
