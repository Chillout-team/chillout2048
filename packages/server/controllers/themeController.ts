import { Request, Response } from "express";
import { UserTheme } from "../models/userTheme";

export class ThemeController {
    public async getThemeById(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id, 10);

        try {
            let userTheme = await UserTheme.findByPk(id);

            if (!userTheme) {
                // Если темы пользователя нет в базе, создаем ее
                userTheme = await UserTheme.create({
                    id: id,
                    theme: "light",
                    themeId: 1,
                });
            }

            res.status(200).send(userTheme);
        } catch (error) {
            res.status(500).send({ message: error });
        }
    }

    public async updateTheme(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { theme, themeId } = req.body;
        console.log("params", req.params);
        console.log("req.body", req.body);
        try {
            const userTheme = await UserTheme.findByPk(id);

            if (!userTheme) {
                res.status(404).send({ message: "User theme not found" });
                return;
            }

            userTheme.theme = theme;
            userTheme.themeId = themeId;
            await userTheme.save();

            res.json(userTheme);
        } catch (error) {
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

export function themeController(): ThemeController {
    return new ThemeController();
}
