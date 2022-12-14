import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppDataSource from "../data-source";
import { User } from "../entities/users";
export async function verifyIfAdminMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authToken = request.headers.authorization;
    if (!authToken) {
        return response.status(401).json({
            message: "Missing authorization headers",
        });
    }

    const token = authToken.split(" ")[1];

    verify(token, process.env.SECRET_KEY + "", (error, decode) => {
        if (error) {
            return response.status(401).json({ message: "Invalid token" });
        }

        request.id = decode?.sub;
    });

    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOneBy({ id: request.id });
    let statusCode = 403;
    if (request.method === "PATCH") {
        statusCode = 401;

        if (!(user?.isAdm || request.params.id === request.id)) {
            return response
                .status(statusCode)
                .json({ message: "Missing admin permissions." });
        }
        return next();
    }
    if (!user?.isAdm) {
        return response
            .status(statusCode)
            .json({ message: "Missing admin permissions." });
    }
    return next();
}
