import AppDataSource from "../data-source";
import { User } from "../entities/users";
import { IUserResponse } from "../interfaces/users";

export async function getAllUsersService(): Promise<IUserResponse[]> {
    const userRepo = AppDataSource.getRepository(User);
    const data = await userRepo.find();
    const usersWithoutPassword = data.map(({ password, ...user }) => user);
    return usersWithoutPassword;
}
