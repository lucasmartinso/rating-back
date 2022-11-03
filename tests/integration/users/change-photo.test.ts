import { signIn, signUp } from "../../../src/types/usersType";
import { __createUser } from "../../factories/sign-up-factory";
import serverSupertest from "../../jestConfig";
import httpStatus from 'http-status';
import { connectPrisma, deleteAllData, disconnectPrisma, disconnectRedis } from "../../factories/scenary-factory";
import { faker }from "@faker-js/faker";
import { __createToken } from "../../factories/login-factory";

const server = serverSupertest(); 

beforeEach( async() => {
    await connectPrisma();
    await deleteAllData();
});

describe('PUT /user/photo', () => { 
    it('Should answer 200, if the user send corretly photo schema', async () => {
        const mainPhoto: string = faker.image.imageUrl(); 
        const token: string = await __createToken();

        const { status }: { status: number } = await server.put('/user/photo').set("Authorization",token).send({mainPhoto});

        expect(status).toBe(httpStatus.OK);
    });

    it('Should answer 422, if the user send corretly photo schema', async () => {
        const mainPhoto: string = faker.lorem.words(2); 
        const token = await __createToken();
        const errorMessage: string = 'Invalid image, wrong format'

        const { status, text }: { status: number, text: string } = await server.put('/user/photo').set("Authorization",token).send({mainPhoto});

        expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        expect(text).toContain(errorMessage);
    });
});

afterAll(async() => { 
    await disconnectPrisma();
    await disconnectRedis();
});