import serverSupertest from "../../jestConfig";
import httpStatus from 'http-status';
import { connectPrisma, disconnectPrisma, deleteAllData } from "../../factories/scenary-factory";
import { faker } from "@faker-js/faker";
import { __createRating } from "../../factories/rating-factory";
import { __createToken } from "../../factories/login-factory";
import { __createRestaurant } from "../../factories/place-factory";
import { placeInfo } from "../../../src/types/placesType";

const server = serverSupertest();

beforeEach( async() => {
    await connectPrisma();
    await deleteAllData();
});

describe('TEST SCHEMAS POST /places/create', () => { 
    it(`Should answer 422, if user send place's name that doesn't match with pattern`, async () => {
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();
        const errorMessage: string = 'Name must be between 2 and 30 characters';

        const randomName: string = faker.lorem.word(40);
        const { status, text }: { status: number, text: string } = await server.post('/places/create').set("Authorization",token).send({... placeData, name: randomName });

        expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        expect(text).toContain(errorMessage);
    });

    it(`Should answer 422, if user send place's description that doesn't is a string`, async () => {
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();
        const errorMessage: string = 'Description needs to be string and brief';

        const randomNumber: number = Number(faker.random.numeric());
        const { status, text }: { status: number, text: string } = await server.post('/places/create').set("Authorization",token).send({... placeData, description: randomNumber });

        expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        expect(text).toContain(errorMessage);
    });

    it(`Should answer 422, if user send place's website that doesn't is a url format`, async () => {
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();
        const errorMessage: string = 'Website needs to be in url format';

        const randomEmail: string = faker.internet.email();
        const { status, text }: { status: number, text: string } = await server.post('/places/create').set("Authorization",token).send({... placeData, website: randomEmail });

        expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        expect(text).toContain(errorMessage);
    });

    it(`Should answer 422, if user send place's mainPhoto that doesn't is a url format`, async () => {
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();
        const errorMessage: string = 'Photo needs to be in url format';

        const randomEmail: string = faker.internet.email();
        const { status, text }: { status: number, text: string } = await server.post('/places/create').set("Authorization",token).send({... placeData, mainPhoto: randomEmail });

        expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        expect(text).toContain(errorMessage);
    });

    it(`Should answer 422, if user send place's type that doesn't match with the pattern`, async () => {
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();
        const errorMessage: string = 'Unavailable type';

        const randomNumber: number = Number(faker.random.numeric());
        const { status, text }: { status: number, text: string } = await server.post('/places/create').set("Authorization",token).send({... placeData, type: randomNumber });

        expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        expect(text).toContain(errorMessage);
    });

    it(`Should answer 422, if user send place's city that doesn't match with the pattern`, async () => {
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();
        const errorMessage: string = 'Unavailable city';

        const randomNumber: number = Number(faker.random.numeric());
        const { status, text }: { status: number, text: string } = await server.post('/places/create').set("Authorization",token).send({... placeData, city: randomNumber });

        expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        expect(text).toContain(errorMessage);
    });

    it(`Should answer 422, if user send place's address that doesn't match with the pattern`, async () => {
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();
        const errorMessage: string = 'Unavailable address';

        const randomNumber: number = Number(faker.random.numeric());
        const { status, text }: { status: number, text: string } = await server.post('/places/create').set("Authorization",token).send({... placeData, address: randomNumber });

        expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        expect(text).toContain(errorMessage);
    });
});

afterAll(async() => { 
    await disconnectPrisma();
});