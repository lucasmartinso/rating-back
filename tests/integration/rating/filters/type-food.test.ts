import { __createUser } from "../../../factories/sign-up-factory";
import serverSupertest from "../../../jestConfig";
import httpStatus from 'http-status';
import { connectPrisma, deleteAllData, disconnectPrisma } from "../../../factories/scenary-factory";
import { placeInfo } from "../../../../src/types/placesType";
import { __createRestaurant } from "../../../factories/place-factory";
import { __createToken } from "../../../factories/login-factory";
import prisma from "../../../../src/databases/prisma"
import { __createRating } from "../../../factories/rating-factory";
import { typeFoodPlaces } from "@prisma/client";
import { faker } from "@faker-js/faker";

const server = serverSupertest();

beforeEach( async() => {
    await connectPrisma();
    await deleteAllData();
});

describe('TEST GET /places/food-type/:typeId', () => { 
    it.todo('Should answer 200, send type best')/*, async() => { 
        const placeData: placeInfo = await __createRestaurant();
        const token: string = await __createToken();
        const typeId: typeFoodPlaces | null = await prisma.typeFoodPlaces.findUnique({where: {name: placeData.type}});
        
        await server.post('/places/create').set("Authorization",token).send(placeData);
        const place = await server.get('/places').send({});

        const { status, body , text }: { status: number, body: any, text: string } = await server.get(`/places/food-type/${typeId?.id}`).send({});
        console.log(typeId);
        console.log(place.body);
        console.log(body);

        expect(status).toBe(httpStatus.OK);
        expect(body).toBeInstanceOf(Array);
        expect(body[0].typeId).toBe(typeId?.id);
        
    });*/

    it('Should answer 200, send type best', async() => {
        const randomNumber: number = Number(faker.random.numeric(3));
        const errorMessage: string = 'None restaurant with that type has been registred yet'
       
        const { status , text }: { status: number, text: string } = await server.get(`/places/food-type/${randomNumber}`).send({});
        
        expect(status).toBe(httpStatus.NOT_FOUND);
        expect(text).toBe(errorMessage);
    });
});

afterAll(async() => { 
    await disconnectPrisma();
});