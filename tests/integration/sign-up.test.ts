import { signUp } from "../../src/types/usersType";
import { __createUser } from "../factories/sign-up-factory";
import serverSupertest from "../factories/jestConfig";

const server = serverSupertest()

describe('TEST POST /sign-up', () =>  {
    it('Should answer 200, if the user send the corretly schema', async() => { 
        const userData: signUp = await __createUser();

        const { status }: { status: number } = await server.post('/sign-up').send(userData);
    
        expect(status).toBe(200);
    });
})