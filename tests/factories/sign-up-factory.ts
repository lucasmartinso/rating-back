import { faker }from "@faker-js/faker";
import { signUp } from "../../src/types/usersType";

export async function __createUser() {
    const password: string = faker.internet.password(11);

    const userData: signUp = {
        name: faker.name.firstName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: password,
        confirmPassword: password,
        mainPhoto: faker.image.imageUrl()
    }

    return userData;
}