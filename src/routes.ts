import { Router } from "express";
import { loginController } from "./controllers/login.controller";
import {
    createUserController,
    deleteUserController,
    getAllUsersController,
    updateUserController,
} from "./controllers/users.controllers";
import { validSerializerMiddleware } from "./middlewares/validSerializer.middleware";
import { verifyIfAdminMiddleware } from "./middlewares/verifyIfAdmin.middleware";
import { verifyIfUserExistsMiddleware } from "./middlewares/verifyIfUserExists";
import { loginSerializer } from "./serializers/login.serializer";
import {
    createUserSerializer,
    updateUserSerializer,
} from "./serializers/user.serializer";

export const usersRoutes = Router();

usersRoutes.post(
    "",
    validSerializerMiddleware(createUserSerializer),
    createUserController
);
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
    validSerializerMiddleware(updateUserSerializer),
    updateUserController
);

export const commonRoutes = Router();

commonRoutes.post(
    "",
    validSerializerMiddleware(loginSerializer),
    loginController
);
