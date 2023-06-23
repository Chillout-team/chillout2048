import { Request, Response } from "express";
import { ForumTopics } from "../models/forumTopics";
import { Users } from "../models/users";
import { ForumMessages } from "../models/forumMessages";
import { literal } from "sequelize";
import { addUser } from "../utils/addUser";
import { requestValidator } from "../utils/requestValidator";

export const topicController = () => {
    return {
        async getForumTopics(_: Request, res: Response) {
            try {
                const topics = await ForumTopics.findAll({
                    attributes: [
                        "topic_id",
                        "name",
                        [
                            literal(
                                '(SELECT count(m.message_id) FROM messages AS m WHERE m.topic_id = "topics"."topic_id")',
                            ),
                            "messagesCount",
                        ],
                        "createdAt",
                    ],
                    include: [
                        {
                            model: Users,
                            attributes: ["user_id", "login", "avatar"],
                        },
                        {
                            model: ForumMessages,
                            attributes: ["message", "createdAt"],
                            limit: 1,
                            order: [["message_id", "DESC"]],
                        },
                    ],
                    order: [["createdAt", "ASC"]],
                });
                return res.status(200).send(topics);
            } catch (e) {
                return res.status(500).send({
                    message: (e as Error).message || "Get forum topics error.",
                });
            }
        },

        async addForumTopic(req: Request, res: Response) {
            try {
                requestValidator(req.body);

                const { name, user } = req.body;
                const userId = await addUser(user);

                const topic = await ForumTopics.create({
                    name: name,
                    user_id: userId.dataValues.user_id,
                });

                return res.status(201).json(topic);
            } catch (e) {
                return res.status(500).send({
                    message: (e as Error).message || "Add forum topic error.",
                });
            }
        },
    };
};
