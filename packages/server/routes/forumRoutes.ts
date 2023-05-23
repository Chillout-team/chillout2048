import { forumController } from "../controllers/forumController";
import { Router } from "express";

export const forumRouters = Router();

forumRouters.get('/', forumController().getForumTopics);
