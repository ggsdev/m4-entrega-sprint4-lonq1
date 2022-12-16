import { Router } from "express";
import { loginController } from "./controllers/login.controller";
import {
    createUserController,
    deleteUserController,
    getAllUsersController,
    updateUserController,
} from "./controllers/users.controllers";
import { verifyIfAdminMiddleware } from "./middlewares/verifyIfAdmin.middleware";
import { verifyIfUserExistsMiddleware } from "./middlewares/verifyIfUserExists";

export const usersRoutes = Router();

usersRoutes.post("", createUserController);
usersRoutes.get("", verifyIfAdminMiddleware, getAllUsersController);
usersRoutes.delete(
    "/:id",
    verifyIfAdminMiddleware,
    verifyIfUserExistsMiddleware,
    deleteUserController
);
usersRoutes.patch(
    "/:id",
    verifyIfAdminMiddleware,
    verifyIfUserExistsMiddleware,
    updateUserController
);

export const commonRoutes = Router();

commonRoutes.post("", loginController);
