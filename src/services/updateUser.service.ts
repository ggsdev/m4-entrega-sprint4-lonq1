import { hashSync } from "bcryptjs";
import AppDataSource from "../data-source";
import { User } from "../entities/users";
import { IUserUpdate } from "../interfaces/users";

export async function updateUserService(payload: IUserUpdate, id: string) {
    const { email, name, password } = payload;

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id });
    const checkEmail = await userRepo.findOneBy({ email });

    if (checkEmail) {
        return {
            statusCode: 401,
            data: { message: "Can't update to this email." },
        };
    }

    if (user && email) user.email = email;
    if (user && password) user.password = hashSync(password, 10);
    if (user && name) user.name = name;

    user && (await userRepo.save(user));
    return { statusCode: 200, data: user };
}
