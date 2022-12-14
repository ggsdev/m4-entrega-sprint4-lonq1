import AppDataSource from "../data-source";
import { User } from "../entities/users";
import { ICreateUserResponse, IUserRequest } from "../interfaces/users";

export async function createUserService(
    payload: IUserRequest
): Promise<ICreateUserResponse> {
    const userRepo = AppDataSource.getRepository(User);

    const data = await userRepo.findOneBy({
        email: payload.email,
    });

    if (data) {
        return {
            statusCode: 400,
            message: "User already exist's in our database.",
        };
    }

    const newUser = userRepo.create(payload);
    await userRepo.save(newUser);

    const { password, ...userWithoutPassword } = newUser;
    return { statusCode: 201, data: userWithoutPassword };
}
