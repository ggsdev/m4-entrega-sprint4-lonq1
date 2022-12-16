import AppDataSource from "../data-source";
import { User } from "../entities/users";

export async function deleteUserService(id: string) {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id });
    if (!user?.isActive) {
        return { statusCode: 400, message: "User is inactive already." };
    }
    await userRepo.softDelete({ id });
    user.isActive = false;
    await userRepo.save(user);

    return { statusCode: 204, message: {} };
}
