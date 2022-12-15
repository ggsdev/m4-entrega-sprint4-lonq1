import AppDataSource from "../data-source";
import { User } from "../entities/users";
import { AppError } from "../errorGlobal/AppError";

export async function deleteUserService(id: string) {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id });
    if (!user?.isActive) {
        throw new AppError(400, "User is inactive already.");
    }

    await userRepo.save({ id, isActive: false });
}
