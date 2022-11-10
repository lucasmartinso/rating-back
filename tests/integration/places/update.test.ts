import { __createUser } from "../../factories/sign-up-factory";
import serverSupertest from "../../jestConfig";
import httpStatus from 'http-status';
import { connectPrisma, deleteAllData, disconnectPrisma } from "../../factories/scenary-factory";
import { faker }from "@faker-js/faker";
import { __createRestaurant } from "../../factories/place-factory";
import { __createToken } from "../../factories/login-factory";

const server = serverSupertest();

beforeEach( async() => {
    await connectPrisma();
    await deleteAllData();
});

describe('TEST PUT /places/:id/verify', () => { 
    it.todo(`Should answer 200, if change restaurant's verify state`)/*, async() => { 
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();

        await server.post('/places/create').set("Authorization",token).send(placeData);
        const promise = await server.get('/places').send({});
        const { status, body }: { status: number, body: any } = await server.get('/places/').send({});

        expect(status).toBe(httpStatus.OK);
    });*/
});

afterAll(async() => { 
    await disconnectPrisma();
});