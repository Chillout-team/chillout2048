import { Router } from "express";
import { themeController } from "../controllers/themeController";

export const themeRouter = Router();

themeRouter.get("/:id", themeController().getThemeById);
themeRouter.post("/:id", themeController().updateTheme);
