import AppDataSource from "../data-source";
import { User } from "../entities/users";

export async function deleteUserService(id: string) {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id });
    if (!user?.isActive) {
        return { statusCode: 400, message: "User is inactive already." };
    }

    await userRepo.save({ id, isActive: false });

    return { statusCode: 204, message: {} };
}
