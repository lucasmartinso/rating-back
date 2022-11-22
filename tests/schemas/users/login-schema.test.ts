import serverSupertest from "../../jestConfig";
import httpStatus from 'http-status';
import { connectPrisma, disconnectPrisma, deleteAllData } from "../../factories/scenary-factory";
import { faker } from "@faker-js/faker";
import { signIn } from "../../../src/types/usersType";
import { __createLogin } from "../../factories/login-factory";

const server = serverSupertest();

beforeEach( async() => {
    await connectPrisma();
    await deleteAllData();
});

describe('TEST SCHEMAS POST /login', () => { 
    it('Should answer 422, if user send usernameEmail that doesn`t match with the pattern or is null', async () => { 
        const loginData: signIn = await __createLogin();
        loginData.usernameEmail = faker.lorem.words(2);
        const errorMessage: string = 'Invalid user, allows only letters, numbers, ".","@", "_" and "-"';

        const { status, text }: { status: number, text: string } = await server.post('/login').send(loginData);
    
        expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        expect(text).toContain(errorMessage);
    });

    it('Should answer 422, if user send password that doesn`t match with the pattern or is null', async () => { 
        const loginData: signIn = await __createLogin();
        loginData.password = faker.lorem.word(7);
        const errorMessage: string = 'Invalid password, min 8 characters';

        const { status, text }: { status: number, text: string } = await server.post('/login').send(loginData);
    
        expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        expect(text).toContain(errorMessage);
    });
});

afterAll(async() => { 
    await disconnectPrisma();
});