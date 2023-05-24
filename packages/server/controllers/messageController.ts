import { Request, Response } from "express";
import { ForumTopics } from "../models/forumTopics";
import { Users } from "../models/users";
import { ForumMessages } from "../models/forumMessages";
import { addUser } from "../utils/addUser";
import { requestValidator } from "../utils/requestValidator";

export const messageController = () => {
    return {
        async getForumMessages(_: Request, res: Response) {
            try {
                const data = await ForumMessages.findAll({
                    attributes: ["message_id", "message", "createdAt"],
                    include: [
                        {
                            model: Users,
                            attributes: [
                                "user_id",
                                "login",
                                "display_name",
                                "avatar",
                            ],
                        },
                        {
                            model: ForumTopics,
                            attributes: ["topic_id", "name"],
                        },
                    ],
                    order: [["createdAt", "ASC"]],
                });
                return res.status(200).send(data);
            } catch (e) {
                return res.status(500).send({
                    message:
                        (e as Error).message || "Get forum messages error.",
                });
            }
        },

        async addForumMessage(req: Request, res: Response) {
            try {
                requestValidator(req.body);

                const { message, topic_id, user } = req.body;
                const userId = await addUser(user);

                const messages = await ForumMessages.create({
                    message: message,
                    user_id: userId.dataValues.user_id,
                    topic_id: topic_id,
                });

                return res.status(201).json(messages);
            } catch (e) {
                return res.status(500).send({
                    message: (e as Error).message || "Add forum message error.",
                });
            }
        },
    };
};
