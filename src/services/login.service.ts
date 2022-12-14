import { compareSync } from "bcryptjs";
import AppDataSource from "../data-source";
import { User } from "../entities/users";
import { IUserLogin, IUserLoginResponse } from "../interfaces/users";
import jwt from "jsonwebtoken";

export async function loginService({
    email,
    password,
}: IUserLogin): Promise<IUserLoginResponse> {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({
        email,
    });

    if (!user) {
        return { statusCode: 403, message: "Invalid e-mail or password" };
    }

    const verifyPassword = compareSync(password, user.password);
    if (!verifyPassword) {
        return { statusCode: 403, message: "Invalid e-mail or password" };
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY + "", {
        expiresIn: "24h",
        subject: user.id,
    });

    return { statusCode: 200, token };
}
