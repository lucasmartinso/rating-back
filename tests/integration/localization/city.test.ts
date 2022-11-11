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

describe('TEST GET /cities/:id', () => { 
    it.todo(`Should answer 404, if the user send nothing`)/*, async() => { 
        const randomState: number = Number(faker.datatype.number({ min: 1, max: 27 }));
        const stateNumber: number = 22;

        const { status, body }: { status: number, body: cities[] } = await server.get(`/cities/${stateNumber}`).send({});
        console.log(body);

        expect(status).toBe(httpStatus.OK);
    });*/

    it(`Should answer 404, if the user send nothing`, async() => { 
        const randomState: number = Number(faker.datatype.number({ min: 1, max: 27 }));

        const { status, body }: { status: number, body: cities[] } = await server.get(`/cities/${randomState}`).send({});

        expect(status).toBe(httpStatus.NOT_FOUND);
        expect(body).not.toBeInstanceOf(Array);
    });
});

afterAll(async() => { 
    await disconnectPrisma();
});