import { hashSync } from "bcryptjs";
import AppDataSource from "../data-source";
import { User } from "../entities/users";
import { AppError } from "../errorGlobal/AppError";
import { IUserUpdate, IUserUpdateResponse } from "../interfaces/users";

export async function updateUserService(
    payload: IUserUpdate,
    id: string
): Promise<IUserUpdateResponse | null> {
    const { email, name, password } = payload;

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id });
    const checkEmail = await userRepo.findOneBy({ email });

    if (checkEmail) {
        throw new AppError(401, "Can't update to this email.");
    }

    if (user && email) user.email = email;
    if (user && password) user.password = hashSync(password, 10);
    if (user && name) user.name = name;

    user && (await userRepo.save(user));
    return user;
}
