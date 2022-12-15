import { Request, Response } from "express";
import { createUserService } from "../services/createUser.service";
import { deleteUserService } from "../services/deleteUser.service";
import { getAllUsersService } from "../services/getAllUsers.service";
import { updateUserService } from "../services/updateUser.service";

export async function createUserController(
    request: Request,
    response: Response
) {
    const data = await createUserService(request.body);
    return response.status(201).json(data);
}

export async function getAllUsersController(
    request: Request,
    response: Response
) {
    const data = await getAllUsersService();
    return response.json(data);
}

export async function deleteUserController(
    request: Request,
    response: Response
) {
    await deleteUserService(request.params.id);
    return response.status(204).json({});
}

export async function updateUserController(
    request: Request,
    response: Response
) {
    const data = await updateUserService(request.body, request.params.id);
    return response.status(200).json(data);
}
