import { Request, Response } from "express";
import { loginService } from "../services/login.service";

export async function loginController(request: Request, response: Response) {
    const { statusCode, token, message } = await loginService(request.body);
    if (message) {
        return response.status(statusCode).json({ message });
    }
    return response.status(statusCode).json({ token });
}
