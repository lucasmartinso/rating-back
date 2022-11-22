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

    it(`Should answer 409, if the user send the corretly schema but restaurant's address already exist`, async() => {
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();
        const errorMessage: string = `This place's address already exists`;

        await server.post('/places/create').set("Authorization",token).send(placeData);

        placeData.name = faker.company.name();
        const { status, text }: { status: number, text: string } = await server.post('/places/create').set("Authorization",token).send(placeData);

        expect(status).toBe(httpStatus.CONFLICT);
        expect(text).toBe(errorMessage)
    });

    it(`Should answer 409, if the user send the corretly schema but restaurant's website already exist`, async() => {
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();
        const errorMessage: string = `This place's website already exists`;

        await server.post('/places/create').set("Authorization",token).send(placeData);

        placeData.name = faker.company.name();
        placeData.address = faker.address.country();
        const { status, text }: { status: number, text: string } = await server.post('/places/create').set("Authorization",token).send(placeData);

        expect(status).toBe(httpStatus.CONFLICT);
        expect(text).toBe(errorMessage)
    });

    it(`Should answer 404, if the user send the corretly schema but city doesn't exist at database`, async() => {
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();
        const errorMessage: string = `This city isn't registred at the database`;

        placeData.city = faker.address.city();
        const { status, text }: { status: number, text: string } = await server.post('/places/create').set("Authorization",token).send(placeData);

        expect(status).toBe(httpStatus.NOT_FOUND);
        expect(text).toBe(errorMessage)
    });

    it(`Should answer 404, if the user send the corretly schema but food type doesn't exist at database`, async() => {
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();
        const errorMessage: string = `This type food isn't registred at the database`;

        placeData.type = faker.commerce.product();
        const { status, text }: { status: number, text: string } = await server.post('/places/create').set("Authorization",token).send(placeData);

        expect(status).toBe(httpStatus.NOT_FOUND);
        expect(text).toBe(errorMessage)
    });
})

afterAll(async() => { 
    await disconnectPrisma();
});