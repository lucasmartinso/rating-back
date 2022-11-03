import serverSupertest from "../jestConfig";
import httpStatus from 'http-status';
import { connectPrisma, disconnectPrisma, disconnectRedis, deleteAllData } from "../factories/scenary-factory";
import { faker } from "@faker-js/faker";
import { signUp } from "../../src/types/usersType";
import { __createUser } from "../factories/sign-up-factory";

const server = serverSupertest();

beforeEach( async() => {
    await connectPrisma();
    await deleteAllData();
});

describe('TEST SCHEMAS POST /sign-up', () => { 
    it('Should answer 422, if user send name that doesn`t match with the pattern or is null', async () => { 
        const userData: signUp = await __createUser();
        userData.name = faker.random.numeric(5);
        const errorMessage: string = 'Invalid name, allows only letters and spaces';

        const { status, text } = await server.post('/sign-up').send(userData);

        expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        expect(text).toContain(errorMessage);
    });

    it('Should answer 422, if user send username that doesn`t match with the pattern or is null', async () => { 
        const userData: signUp = await __createUser();
        userData.username = faker.internet.email();
        const errorMessage: string = 'Invalid username, allows only letters, numbers, ".","_","-"';

        const { status, text } = await server.post('/sign-up').send(userData);

        expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        expect(text).toContain(errorMessage);
    });

    it('Should answer 422, if user send email that doesn`t match with the pattern or is null', async () => { 
        const userData: signUp = await __createUser();
        userData.email = faker.random.numeric(5);
        const errorMessage: string = 'Invalid email, has to follow email format **@**.com or **@**.net';

        const { status, text } = await server.post('/sign-up').send(userData);
        console.log(text);

        expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        expect(text).toContain(errorMessage);
    });    
})

afterAll(async() => { 
    await disconnectPrisma();
    await disconnectRedis();
});