import * as yup from "yup";
import { SchemaOf } from "yup";
import {
    IUserRequest,
    IUserResponse,
    IUserUpdate,
    IUserWithPasswordResponse,
} from "../interfaces/users";

const createUserSerializer: SchemaOf<IUserRequest> = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    name: yup.string().required(),
    isAdm: yup.bool().required(),
});

const updateUserSerializer: SchemaOf<IUserUpdate> = yup.object().shape({
    email: yup.string().email(),
    password: yup.string(),
    name: yup.string(),
});

const userWithoutPasswordSerializer: SchemaOf<IUserResponse> = yup
    .object()
    .shape({
        email: yup.string().email(),
        name: yup.string(),
        isAdm: yup.bool(),
        createdAt: yup.date(),
        updatedAt: yup.date(),
        id: yup.string().uuid(),
    });

const listUsersWithoutPasswordSerializer = yup.array(
    userWithoutPasswordSerializer
);

export {
    updateUserSerializer,
    createUserSerializer,
    userWithoutPasswordSerializer,
    listUsersWithoutPasswordSerializer,
};
