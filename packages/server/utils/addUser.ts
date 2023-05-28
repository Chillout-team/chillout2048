import { Users } from "../models/users";

interface IUser {
    id: number;
    display_name?: string;
    login: string;
    avatar?: string | null;
}

export async function addUser(user: IUser) {
    let userId = await Users.findOne({
        attributes: ["user_id"],
        where: {
            user_id: user.id,
        },
    });

    if (!userId) {
        userId = await Users.create({
            user_id: user.id,
            login: user.login,
            display_name: user.display_name,
            avatar: user.avatar,
        });
    }
    return userId;
}
