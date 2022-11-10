import { __createUser } from "../../factories/sign-up-factory";
import serverSupertest from "../../jestConfig";
import httpStatus from 'http-status';
import { connectPrisma, deleteAllData, disconnectPrisma } from "../../factories/scenary-factory";
import { faker }from "@faker-js/faker";
import { __createRestaurant } from "../../factories/place-factory";
import { __createToken } from "../../factories/login-factory";
import { placeInfo } from "../../../src/types/placesType";
import { foodPlaces } from "@prisma/client";

const server = serverSupertest();

beforeEach( async() => {
    await connectPrisma();
    await deleteAllData();
});

describe('TEST POST /places/search', () => { 
    it(`Should answer 200, if change restaurant's verify state`, async() => { 
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();
        const search: string = placeData.name.substring(0,2).toUpperCase();

        await server.post('/places/create').set("Authorization",token).send(placeData);
        const { status, body }: { status: number, body: foodPlaces[] } = await server.post(`/places/search?name=${search}`).send({});

        expect(status).toBe(httpStatus.OK);
        expect(body[0]).toHaveProperty('id');
        expect(body[0]).toHaveProperty('name');
        expect(body[0]).toHaveProperty('score');
        expect(body[0]).toHaveProperty('description');
        expect(body[0]).toHaveProperty('website');
        expect(body[0]).toHaveProperty('mainPhoto');
        expect(body[0]).toHaveProperty('address');
        expect(body[0]).toHaveProperty('typeId');
        expect(body[0]).toHaveProperty('cityId');
        expect(body[0]).toHaveProperty('verify');
    });

    it(`Should answer 404, if restaurant's search is faill`, async() => { 
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();
        const badSearch: string = faker.lorem.paragraph();
        const errorMessage: string = 'Any place was found'

        await server.post('/places/create').set("Authorization",token).send(placeData);
        const { status, text }: { status: number, text: string } = await server.post(`/places/search?name=${badSearch}`).send({});

        expect(status).toBe(httpStatus.NOT_FOUND);
        expect(text).toBe(errorMessage);
    });
})

afterAll(async() => { 
    await disconnectPrisma();
});