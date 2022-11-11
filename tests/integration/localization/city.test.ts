import { __createUser } from "../../factories/sign-up-factory";
import serverSupertest from "../../jestConfig";
import httpStatus from 'http-status';
import { connectPrisma, deleteAllData, disconnectPrisma } from "../../factories/scenary-factory";
import { cities, states } from "@prisma/client";
import { faker } from "@faker-js/faker";

const server = serverSupertest();

beforeEach( async() => {
    await connectPrisma();
    await deleteAllData();
});

describe('TEST POST /cities/:id', () => { 
    it(`Should answer 200, if the user send some part of city's name`, async() => { 
        const randomState: number = Number(faker.datatype.number({ min: 1, max: 27 }));
        const stateNumber: number = 22;
        const cityLetter: string = 'a';

        const { status, body }: { status: number, body: cities[] } = await server.post(`/cities/${stateNumber}?city=${cityLetter}`).send({});
        console.log(body);

        expect(status).toBe(httpStatus.OK);
        expect(body).toBeInstanceOf(Array);
    });

    it(`Should answer 404, if the user send nothing`, async() => { 
        const randomState: number = Number(faker.datatype.number({ min: 1, max: 27 }));
        const randomAddress: string = faker.address.streetAddress(true);
        const errorMessage: string = ''

        const { status, body, text }: { status: number, body: cities[], text: string } = await server.post(`/cities/${randomState}?city=${randomAddress}`).send({});

        expect(status).toBe(httpStatus.NOT_FOUND);
        expect(body).not.toBeInstanceOf(Array);
    });
});

afterAll(async() => { 
    await disconnectPrisma();
});