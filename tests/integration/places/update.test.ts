import { __createUser } from "../../factories/sign-up-factory";
import serverSupertest from "../../jestConfig";
import httpStatus from 'http-status';
import { connectPrisma, deleteAllData, disconnectPrisma } from "../../factories/scenary-factory";
import { faker }from "@faker-js/faker";
import { __createRestaurant } from "../../factories/place-factory";
import { __createToken } from "../../factories/login-factory";
import { placeInfo } from "../../../src/types/placesType";

const server = serverSupertest();

beforeEach( async() => {
    await connectPrisma();
    await deleteAllData();
});

describe('TEST PUT /places/:id/verify', () => { 
    it(`Should answer 200, if change restaurant's verify state`, async() => { 
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();

        await server.post('/places/create').set("Authorization",token).send(placeData);
        const place = await server.get('/places').send({});
        const { status }: { status: number } = await server.put(`/places/${place.body[0].id}/verify`).set("Authorization",token).send({});     

        expect(status).toBe(httpStatus.OK);
    });

    it(`Should answer 400, when try to verify a restaurant that already has`, async() => { 
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();
        const errorMessage: string = 'This place is already verify'

        await server.post('/places/create').set("Authorization",token).send(placeData);
        const place = await server.get('/places').send({});
        await server.put(`/places/${place.body[0].id}/verify`).set("Authorization",token).send({});
        const { status, text }: { status: number, text: string } = await server.put(`/places/${place.body[0].id}/verify`).set("Authorization",token).send({});     

        expect(status).toBe(httpStatus.BAD_REQUEST);
        expect(text).toBe(errorMessage);
    });
});

describe('TEST PUT /places/:id/website', () => { 
    it(`Should answer 200, if change restaurant's website`, async() => {
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();
        const fakeWebsite: string = faker.internet.url();

        await server.post('/places/create').set("Authorization",token).send(placeData);
        const place = await server.get('/places').send({});
        const { status }: { status: number } = await server.put(`/places/${place.body[0].id}/website`).set("Authorization",token).send({ website: fakeWebsite});     

        expect(status).toBe(httpStatus.OK);
    })
});

describe('TEST PUT /places/:id/description', () => { 
    it(`Should answer 200, if change restaurant's description`, async() => {
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();
        const fakeDescription: string = faker.lorem.words(1);

        await server.post('/places/create').set("Authorization",token).send(placeData);
        const place = await server.get('/places').send({});
        const { status }: { status: number } = await server.put(`/places/${place.body[0].id}/description`).set("Authorization",token).send({ description: fakeDescription});     

        expect(status).toBe(httpStatus.OK);
    })
});

afterAll(async() => { 
    await disconnectPrisma();
});