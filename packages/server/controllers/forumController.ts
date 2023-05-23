import { Request, Response } from "express"
import { ForumTopics } from "../models/forumTopics"
import { Users } from "../models/users"
import { ForumMessages } from "../models/forumMessages"
import { literal } from "sequelize"

export const forumController = () => {
  return {
    async getForumTopics(_: Request, res: Response) {
      try {
        const data = await ForumTopics.findAll({
          attributes: [
            'topic_id',
            'name',
             [
              literal(
                '(SELECT count(m.message_id) FROM messages AS m WHERE m.topic_id = "topics"."topic_id")'
              ),
              'messages',
            ],
          ],
          include: [
            {
              model: Users,
              attributes: ['user_id', 'login'],
            },
            {
              model: ForumMessages,
              attributes: [ 'message', 'createdAt' ],
              limit: 1,
              order: [['id', 'DESC']],
              include: [
                {
                  model: Users,
                  attributes: ['user_id', 'login'],
                },
              ],
            }
          ],
          order: [['createdAt', 'ASC']],
        })
        return res.status(200).send(data)
      } catch (e) {
        return res.status(500).send({
          message:
          (e as Error).message || "Some error."
        })
      }
    },
  }
}
