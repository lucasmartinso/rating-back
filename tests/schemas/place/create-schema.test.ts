import serverSupertest from "../../jestConfig";
import httpStatus from 'http-status';
import { connectPrisma, disconnectPrisma, deleteAllData } from "../../factories/scenary-factory";
import { faker } from "@faker-js/faker";
import { __createRating } from "../../factories/rating-factory";
import { __createToken } from "../../factories/login-factory";
import { ratingInfo } from "../../../src/types/ratingType";
import { __createRestaurant } from "../../factories/place-factory";
import { placeInfo } from "../../../src/types/placesType";
import { foodPlaces } from "@prisma/client";

const server = serverSupertest();

beforeEach( async() => {
    await connectPrisma();
    await deleteAllData();
});

describe('TEST SCHEMAS POST /rating/:id', () => { 
    it(`Should answer 422, if user send food rating that isn't a number or is null`, async () => {
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();
        const errorMessage: string = 'Name must be between 2 and 30 characters';

        const randomName = faker.lorem.word(40);
        const { status, text }: { status: number, text: string } = await server.post('/places/create').set("Authorization",token).send({... placeData, name: randomName });

        expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        expect(text).toContain(errorMessage);
    });
});

afterAll(async() => { 
    await disconnectPrisma();
});