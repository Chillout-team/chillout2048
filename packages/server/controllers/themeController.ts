import { Request, Response } from "express";
import { SiteTheme } from "../models/SiteTheme";
import { UserTheme } from "../models/userTheme";

export class ThemeController {
    public async getThemeById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const userTheme = await UserTheme.findByPk(id, {
                include: [SiteTheme],
            });

            if (!userTheme) {
                res.status(404).json({ message: "User theme not found" });
                return;
            }

            res.status(200).send(userTheme);
        } catch (error) {
            res.status(500).send({ message: "Internal server error" });
        }
    }

    public async updateTheme(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { theme } = req.body;

        try {
            const userTheme = await UserTheme.findByPk(id);

            if (!userTheme) {
                res.status(404).send({ message: "User theme not found" });
                return;
            }

            userTheme.theme = theme;
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
