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

describe('TEST GET /places/:id', () => { 
    it('Should answer 200 and return place info in the corretly format, if it exists', async() => { 
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();

        await server.post('/places/create').set("Authorization",token).send(placeData);
        const place = await server.get('/places').send({});
        const { status, body }: { status: number, body: any } = await server.get(`/places/${place.body[0].id}`).send({});
        console.log(body);

        expect(status).toBe(httpStatus.OK);
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('name');
        expect(body).toHaveProperty('score');
        expect(body).toHaveProperty('description');
        expect(body).toHaveProperty('website');
        expect(body).toHaveProperty('mainPhoto');
        expect(body).toHaveProperty('address');
        expect(body).toHaveProperty('typeId');
        expect(body).toHaveProperty('cityId');
        expect(body).toHaveProperty('verify');
        expect(body).toHaveProperty('city');
    });

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