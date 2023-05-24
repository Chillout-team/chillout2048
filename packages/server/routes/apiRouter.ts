import { Router } from "express";
import { forumRouters } from "./forumRoutes";

export const apiRouter = Router();

apiRouter.use("/forum", forumRouters);
