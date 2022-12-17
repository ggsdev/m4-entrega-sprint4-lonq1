import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppDataSource from "../data-source";
import { User } from "../entities/users";
import { AppError } from "../errorGlobal/AppError";
export async function verifyIfAdminMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authToken = request.headers.authorization;
    if (!authToken) {
        throw new AppError(401, "Missing authorization headers");
    }

    const token = authToken.split(" ")[1];

    verify(token, process.env.SECRET_KEY + "", (error, decode) => {
        if (error) {
            throw new AppError(401, "Invalid token");
        }

        request.id = decode?.sub;
    });

    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOneBy({ id: request.id });
    let statusCode = 403;
    if (request.method === "PATCH") {
        statusCode = 401;
    }
    if (!user.isAdm) {
        throw new AppError(statusCode, "Missing admin permissions.");
    }
    return next();
}