interface IUserRequest {
    name: string;
    email: string;
    password: string;
    isAdm: boolean;
}

interface IUser {
    id: string;
    name: string;
    email: string;
    isAdm: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface ICreateUserResponse {
    data?: IUser;
    message?: string;
    statusCode: number;
}

interface IUserLogin {
    email: string;
    password: string;
}

interface IUserUpdate {
    name?: string;
    email?: string;
    password?: string;
}

interface IUserLoginResponse {
    statusCode: number;
    token?: string;
    message?: string;
}

export {
    IUser,
    IUserLogin,
    IUserLoginResponse,
    IUserRequest,
    IUserUpdate,
    ICreateUserResponse,
};
