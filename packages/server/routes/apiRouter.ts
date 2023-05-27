import { Router } from "express";
import { forumRouters } from "./forumRoutes";
import { themeRouter } from "./themeRouter";

export const apiRouter = Router();

apiRouter.use("/forum", forumRouters);
apiRouter.use("/theme", themeRouter);
