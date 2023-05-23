import { Request, Response } from "express"
import { ForumTopics } from "../models/forumTopics"
import { Users } from "../models/users"
import { ForumMessages } from "../models/forumMessages"

export const messageController = () => {
  return {
    async getForumMessages(_: Request, res: Response) {
      try {
        const data = await ForumMessages.findAll({
          attributes: [
            "message_id",
            "message"
          ],
          include: [
            {
              model: Users,
              attributes: ["user_id", "login", "display_name", "avatar"],
            },
            {
              model: ForumTopics,
              attributes: ["topic_id", "name"],
            },
          ],
          order: [['createdAt', 'ASC']],
        })
        return res.status(200).send(data)
      } catch (e) {
        return res.status(500).send({
          message:
          (e as Error).message || "Get forum messages error."
        })
      }
    },
    
    async addForumMessage(req: Request, res: Response) {
      try {
        const { message, user } = req.body
        const topic = await ForumTopics.create({
          message: message,
          user_id: user
        })
        return res.status(201).json(topic)
      } catch (e) {
        return res.status(500).send({
          message:
          (e as Error).message || "Add forum message error."
        })
      }
    },
  }
}
