import { signIn, signUp } from "../../src/types/usersType";
import { __createUser } from "../factories/sign-up-factory";
import serverSupertest from "../jestConfig";
import httpStatus from 'http-status';
import { connectPrisma, deleteAllData, disconnectPrisma, disconnectRedis } from "../factories/scenary-factory";
import { faker }from "@faker-js/faker";

const server = serverSupertest();

beforeEach( async() => {
    await connectPrisma();
    await deleteAllData();
});

describe('TEST POST /sign-in', () => {
    it('Should answer 200, if the user send the corretly schema', async () => { 
        const userData: signUp = await __createUser();
        const loginData: signIn = {
            usernameEmail: userData.email,
            password: userData.password
        }

        await server.post('/sign-up').send(userData);
        const { status }: { status: number } = await server.post('/login').send(loginData);
    
        expect(status).toBe(httpStatus.OK);
    });

    it(`Should answer 200, if the user send the corretly schema but the email or username doesn't match`, async () => { 
        const userData: signUp = await __createUser();
        const loginData: signIn = {
            usernameEmail: faker.internet.email(),
            password: userData.password
        }
        const errorMessage: string = 'User or password are wrong';

        await server.post('/sign-up').send(userData);
        const { status, text }: { status: number, text: string } = await server.post('/login').send(loginData);
    
        expect(status).toBe(httpStatus.UNAUTHORIZED);
        expect(text).toBe(errorMessage);
    });

    it(`Should answer 200, if the user send the corretly schema but the password doesn't match`, async () => { 
        const userData: signUp = await __createUser();
        const loginData: signIn = {
            usernameEmail: faker.internet.email(),
            password: userData.password
        }
        const errorMessage: string = 'User or password are wrong';

        await server.post('/sign-up').send(userData);
        const { status, text }: { status: number, text: string } = await server.post('/login').send(loginData);
    
        expect(status).toBe(httpStatus.UNAUTHORIZED);
        expect(text).toBe(errorMessage);
    });
})

afterAll(async() => { 
    await disconnectPrisma();
    await disconnectRedis();
});