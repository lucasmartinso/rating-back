import { __createUser } from "../../factories/sign-up-factory";
import serverSupertest from "../../jestConfig";
import httpStatus from 'http-status';
import { connectPrisma, deleteAllData, disconnectPrisma } from "../../factories/scenary-factory";
import { faker }from "@faker-js/faker";
import { placeInfo } from "../../../src/types/placesType";
import { __createRestaurant } from "../../factories/place-factory";
import { __createToken } from "../../factories/login-factory";

const server = serverSupertest();

beforeEach( async() => {
    await connectPrisma();
    await deleteAllData();
});

describe('TEST POST /places/:id', () => { 
    /*it.todo('Should answer 200 and return place info in the corretly format, if it exists', async() => { 
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();

        await server.post('/places/create').set("Authorization",token).send(placeData);
        const promise = await server.get('/places').send({});
        const { status, body }: { status: number, body: any } = await server.get('/places/').send({});

        expect(status).toBe(httpStatus.OK);
    });*/

    it(`Should answer 404, if that send a place's id that doesn't exists`, async() => {
        const randomId: number = Number(faker.random.numeric());
        const errorMessage: string = `This place isn't registred at database`

        const { status, text }: { status: number, text: string } = await server.get(`/places/${randomId}`).send({});

        expect(status).toBe(httpStatus.NOT_FOUND);
        expect(text).toBe(errorMessage);
    });
});

afterAll(async() => { 
    await disconnectPrisma();
});