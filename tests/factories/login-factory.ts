import { faker }from "@faker-js/faker";
import { signIn, signUp } from "../../src/types/usersType";
import supertest from "supertest";
import app from "../../src/index";
import { __createUser } from "./sign-up-factory";

function login() { 
    const userData: signIn = {
        usernameEmail: faker.internet.userName(),
        password: faker.internet.password(11),
    }

    return userData;
}

export async function __createLogin(): Promise<signIn> {
    const userData: signIn = login();

    return userData;
}

export async function __createToken(): Promise<string> { 
    const userData: signUp = await __createUser();
    const loginData: signIn = {
        usernameEmail: userData.email,
        password: userData.password
    }
    const server = supertest(app); 

    await server.post('/sign-up').send(userData);
    const { body }: { body:any } = await server.post('/login').send(loginData);

    return body.token;
}