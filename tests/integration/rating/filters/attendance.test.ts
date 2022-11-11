import { __createUser } from "../../../factories/sign-up-factory";
import serverSupertest from "../../../jestConfig";
import httpStatus from 'http-status';
import { connectPrisma, deleteAllData, disconnectPrisma } from "../../../factories/scenary-factory";
import { faker }from "@faker-js/faker";
import { placeInfo } from "../../../../src/types/placesType";
import { __createRestaurant } from "../../../factories/place-factory";
import { __createToken } from "../../../factories/login-factory";
import { ratingInfo } from "../../../../src/types/ratingType";
import { __createRating } from "../../../factories/rating-factory";

const server = serverSupertest();

beforeEach( async() => {
    await connectPrisma();
    await deleteAllData();
});

describe('TEST GET /places/attendance/:type', () => { 
    it('Should answer 200, send type best', async() => { 
        const ratingData1: ratingInfo = await __createRating();
        const ratingData2: ratingInfo = await __createRating();
        const token: string = await __createToken();

        for(let i=0; i<2; i++) {
            const placeData: placeInfo = await __createRestaurant();
            await server.post('/places/create').set("Authorization",token).send(placeData);
        }

        const place = await server.get('/places').send({});
        await server.post(`/rating/${place.body[0].id}`).set("Authorization",token).send(ratingData1);
        await server.post(`/rating/${place.body[1].id}`).set("Authorization",token).send(ratingData2);

        const { status, body }: { status: number, body: any } = await server.get('/places/attendance/best').send({});

        expect(status).toBe(httpStatus.OK);
        expect(body).toBeInstanceOf(Array);
        expect(Number(body[0].attendance)).toBeGreaterThanOrEqual(Number(body[1].attendance));
    });

    it('Should answer 200, send type last', async() => { 
        const ratingData1: ratingInfo = await __createRating();
        const ratingData2: ratingInfo = await __createRating();
        const token: string = await __createToken();

        for(let i=0; i<2; i++) {
            const placeData: placeInfo = await __createRestaurant();
            await server.post('/places/create').set("Authorization",token).send(placeData);
        }

        const place = await server.get('/places').send({});
        await server.post(`/rating/${place.body[0].id}`).set("Authorization",token).send(ratingData1);
        await server.post(`/rating/${place.body[1].id}`).set("Authorization",token).send(ratingData2);

        const { status, body }: { status: number, body: any } = await server.get('/places/attendance/last').send({});

        expect(status).toBe(httpStatus.OK);
        expect(body).toBeInstanceOf(Array);
        expect(Number(body[0].attendance)).toBeLessThanOrEqual(Number(body[1].attendance));
    });
});

afterAll(async() => { 
    await disconnectPrisma();
});