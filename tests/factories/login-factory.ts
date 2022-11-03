import { faker }from "@faker-js/faker";
import { signIn } from "../../src/types/usersType";

export async function __createLogin(): Promise<signIn> {
    const userData: signIn = {
        usernameEmail: faker.internet.userName(),
        password: faker.internet.password(11),
    }

    return userData;
}