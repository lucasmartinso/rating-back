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
        const ratingData: ratingInfo = await __createRating();
        const token: string = await __createToken();
        const errorMessage: string = 'Food field has to be a number'

        const placeData: placeInfo = await __createRestaurant();
        await server.post('/places/create').set("Authorization",token).send(placeData);
        const { body }: { body: foodPlaces[] } = await server.get('/places').send({});
        const { status, text }: { status: number, text: string } = await server.post(`/rating/${body[0].id}`).set("Authorization",token).send({ ...ratingData, food: 'food'})
        
        expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        expect(text).toContain(errorMessage);
    });

    it(`Should answer 422, if user send environment rating that isn't a number or is null`, async () => {
        const ratingData: ratingInfo = await __createRating();
        const token: string = await __createToken();
        const errorMessage: string = 'Environment field has to be a number'

        const placeData: placeInfo = await __createRestaurant();
        await server.post('/places/create').set("Authorization",token).send(placeData);
        const { body }: { body: foodPlaces[] } = await server.get('/places').send({});
        const { status, text }: { status: number, text: string } = await server.post(`/rating/${body[0].id}`).set("Authorization",token).send({ ...ratingData, environment: 'environment'})
        
        expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        expect(text).toContain(errorMessage);
    });

    it(`Should answer 422, if user send attendance rating that isn't a number or is null`, async () => {
        const ratingData: ratingInfo = await __createRating();
        const token: string = await __createToken();
        const errorMessage: string = 'Attendance field has to be a number'

        const placeData: placeInfo = await __createRestaurant();
        await server.post('/places/create').set("Authorization",token).send(placeData);
        const { body }: { body: foodPlaces[] } = await server.get('/places').send({});
        const { status, text }: { status: number, text: string } = await server.post(`/rating/${body[0].id}`).set("Authorization",token).send({ ...ratingData, attendance: 'attendance'})
        
        expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        expect(text).toContain(errorMessage);
    });

    it(`Should answer 422, if user send price rating that isn't a number or is null`, async () => {
        const ratingData: ratingInfo = await __createRating();
        const token: string = await __createToken();
        const errorMessage: string = 'Price field has to be a number'

        const placeData: placeInfo = await __createRestaurant();
        await server.post('/places/create').set("Authorization",token).send(placeData);
        const { body }: { body: foodPlaces[] } = await server.get('/places').send({});
        const { status, text }: { status: number, text: string } = await server.post(`/rating/${body[0].id}`).set("Authorization",token).send({ ...ratingData, price: 'price'})
        
        expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        expect(text).toContain(errorMessage);
    });
});

afterAll(async() => { 
    await disconnectPrisma();
});