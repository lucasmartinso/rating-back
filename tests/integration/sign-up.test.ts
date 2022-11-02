import { signUp } from "../../src/types/usersType";
import { __createUser } from "../factories/sign-up-factory";
import serverSupertest from "../jestConfig";
import httpStatus from 'http-status';
import { connectPrisma, deleteAllData, disconnectPrisma, disconnectRedis } from "../factories/scenary-factory";
import { faker }from "@faker-js/faker";

const server = serverSupertest();

beforeEach( async() => {
    await connectPrisma();
    await deleteAllData();
})

describe('TEST POST /sign-up', () =>  {
    it('Should answer 200, if the user send the corretly schema', async() => { 
        const userData: signUp = await __createUser();

        const { status }: { status: number } = await server.post('/sign-up').send(userData);
    
        expect(status).toBe(httpStatus.CREATED);
    });

    it('Should answer 409, if the user send the corretly schema but username already exist', async() => { 
        const userData: signUp = await __createUser();
        const errorMessage: string = 'This username already exist';

        await server.post('/sign-up').send(userData);
        const { status, text }: { status: number, text: string } = await server.post('/sign-up').send(userData);
    
        expect(status).toBe(httpStatus.CONFLICT);
        expect(text).toBe(errorMessage);
    });

    it('Should answer 409, if the user send the corretly schema but email already exist', async() => { 
        const userData: signUp = await __createUser();
        const errorMessage: string = 'This email is registred yet';

        await server.post('/sign-up').send(userData);
        userData.username = faker.internet.email();
        const { status, text }: { status: number, text: string } = await server.post('/sign-up').send(userData);
    
        expect(status).toBe(httpStatus.CONFLICT);
        expect(text).toBe(errorMessage);
    });
});

afterAll(async() => { 
    await disconnectPrisma();
    await disconnectRedis();
})