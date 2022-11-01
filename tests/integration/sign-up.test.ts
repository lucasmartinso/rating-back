import { signUp } from "../../src/types/usersType";
import { __createUser } from "../factories/sign-up-factory";
import serverSupertest from "../jestConfig";
import httpStatus from 'http-status';
import { connectPrisma, disconnectPrisma } from "../factories/scenary-factory";

const server = serverSupertest();

beforeEach( async() => {
    await connectPrisma();
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
        const { status }: { status: number, body: string } = await server.post('/sign-up').send(userData);
        const km = await server.post('/sign-up').send(userData);
        console.log(km.text);
    
        expect(status).toBe(httpStatus.CONFLICT);
        expect(km.text).toBe(errorMessage);
    });

    it('Should answer 200, if the user send the corretly schema', async() => { 
        const userData: signUp = await __createUser();

        const { status }: { status: number } = await server.post('/sign-up').send(userData);
    
        expect(status).toBe(httpStatus.CREATED);
    });
});

afterAll(async() => { 
    await disconnectPrisma();
})