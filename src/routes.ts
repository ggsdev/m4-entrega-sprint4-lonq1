import { Router } from "express";
import {
    createUserController,
    getAllUsersController,
    updateUserController,
    deleteUserController,
    loginController,
} from "./controllers/imports";
import {
    validSerializerMiddleware,
    verifyIfAdminMiddleware,
    verifyIfUserExistsMiddleware,
} from "./middlewares/imports";
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
