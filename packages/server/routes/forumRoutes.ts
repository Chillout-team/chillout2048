import { messageController } from "../controllers/messageController";
import { topicController } from "../controllers/topicController";
import { Router } from "express";

export const forumRouters = Router();

forumRouters.get("/", topicController().getForumTopics);
forumRouters.post("/topic/", topicController().addForumTopic);

forumRouters.get("/topic/:id", messageController().getForumMessages);
forumRouters.post("/message/", messageController().addForumMessage);
