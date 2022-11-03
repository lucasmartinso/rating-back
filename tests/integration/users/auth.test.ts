import { __createUser } from "../../factories/sign-up-factory";
import serverSupertest from "../../jestConfig";
import httpStatus from 'http-status';
import { connectPrisma, deleteAllData, disconnectPrisma } from "../../factories/scenary-factory";
import { faker }from "@faker-js/faker";
import { __createToken } from "../../factories/login-factory";

const server = serverSupertest(); 

beforeEach( async() => {
    await connectPrisma();
    await deleteAllData();
});

describe('TEST the Auth', () => { 
    it(`Should answer 401, if the user make an request to auth route and don't set a token`, async () => {
        const mainPhoto: string = faker.image.imageUrl(); 
        const errorMessage: string = 'Insert token to enter';

        const { status, text }: { status: number, text: string } = await server.put('/user/photo').send({mainPhoto});
        console.log(text);

        expect(status).toBe(httpStatus.UNAUTHORIZED);
        expect(text).toBe(errorMessage);
    });

    it(`Should answer 401, if the user make an request to auth route and set a expiry or invalid token`, async () => {
        const mainPhoto: string = faker.image.imageUrl(); 
        const fakeToken: string = faker.random.alphaNumeric(30);
        const errorMessage: string = 'Invalid token';

        const { status, text }: { status: number, text: string } = await server.put('/user/photo').set("Authorization",fakeToken).send({mainPhoto});
        console.log(text);

        expect(status).toBe(httpStatus.UNAUTHORIZED);
        expect(text).toBe(errorMessage);
    })
})

afterAll(async() => { 
    await disconnectPrisma();
});