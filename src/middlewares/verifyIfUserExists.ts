import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/users";

export async function verifyIfUserExistsMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({
        id: request.params.id,
    });

    if (!user) {
        return response.status(404).json({ message: "User not found." });
    }

    return next();
}
