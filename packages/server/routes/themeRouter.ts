import { Router } from "express";
import { themeController } from "../controllers/themeController";

export const themeRouter = Router();

themeRouter.get("/theme", themeController().getThemeById);
themeRouter.post("/theme/:id", themeController().updateTheme);
