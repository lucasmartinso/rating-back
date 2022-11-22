import { __createUser } from "../../factories/sign-up-factory";
import serverSupertest from "../../jestConfig";
import httpStatus from 'http-status';
import { connectPrisma, deleteAllData, disconnectPrisma } from "../../factories/scenary-factory";
import { faker }from "@faker-js/faker";
import { placeInfo } from "../../../src/types/placesType";
import { __createRestaurant } from "../../factories/place-factory";
import { __createToken } from "../../factories/login-factory";
import { ratingInfo } from "../../../src/types/ratingType";
import { __createRating } from "../../factories/rating-factory";

const server = serverSupertest();

beforeEach( async() => {
    await connectPrisma();
    await deleteAllData();
});

describe('TEST POST /rating/:id', () => { 
    it('Should answer 200, if the user send the corretly schema', async() => { 
        const ratingData: ratingInfo = await __createRating();
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();

        await server.post('/places/create').set("Authorization",token).send(placeData);
        const place = await server.get('/places').send({});
        const { status }: { status: number } = await server.post(`/rating/${place.body[0].id}`).set("Authorization",token).send(ratingData);
    
        expect(status).toBe(httpStatus.OK);
    });

    it('Should answer 400, if the user try to rate restaurant twice in the last 72hrs', async() => { 
        const ratingData: ratingInfo = await __createRating();
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();
        const errorMessage: string = 'You have to await 72h to rating this restaurant again';

        await server.post('/places/create').set("Authorization",token).send(placeData);
        const place = await server.get('/places').send({});
        await server.post(`/rating/${place.body[0].id}`).set("Authorization",token).send(ratingData);
        const { status, text }: { status: number, text: string } = await server.post(`/rating/${place.body[0].id}`).set("Authorization",token).send(ratingData);
    
        expect(status).toBe(httpStatus.BAD_REQUEST);
        expect(text).toBe(errorMessage);
    })
})

afterAll(async() => { 
    await disconnectPrisma();
});