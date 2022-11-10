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

describe('TEST POST /places/create', () => { 
    it('Should answer 200, if the user send the corretly schema', async() => { 
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();

        const { status }: { status: number } = await server.post('/places/create').set("Authorization",token).send(placeData);

        expect(status).toBe(httpStatus.CREATED);
    });

    it(`Should answer 409, if the user send the corretly schema but restaurant's name already exist`, async() => {
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();
        const errorMessage: string = `This place's name already exists`;

        await server.post('/places/create').set("Authorization",token).send(placeData);
        const { status, text }: { status: number, text: string } = await server.post('/places/create').set("Authorization",token).send(placeData);

        expect(status).toBe(httpStatus.CONFLICT);
        expect(text).toBe(errorMessage);
    });

    it(`Should answer 409, if the user send the corretly schema but restaurant's website already exist`, async() => {
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();
        placeData.name = faker.company.name();
        const errorMessage: string = `This place's name already exists`;

        await server.post('/places/create').set("Authorization",token).send(placeData);
        const { status, text }: { status: number, text: string } = await server.post('/places/create').set("Authorization",token).send(placeData);
        console.log(text);

        expect(status).toBe(httpStatus.CONFLICT);
        expect(text).toBe(errorMessage)
    });

    it(`Should answer 409, if the user send the corretly schema but restaurant's address already exist`, async() => {
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();
        placeData.name = faker.company.name();
        placeData.website = faker.internet.url();
        const errorMessage: string = `This place's name already exists`;

        await server.post('/places/create').set("Authorization",token).send(placeData);
        const { status, text }: { status: number, text: string } = await server.post('/places/create').set("Authorization",token).send(placeData);

        expect(status).toBe(httpStatus.CONFLICT);
        expect(text).toBe(errorMessage)
    });
})

afterAll(async() => { 
    await disconnectPrisma();
});