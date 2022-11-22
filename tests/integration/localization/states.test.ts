import { __createUser } from "../../factories/sign-up-factory";
import serverSupertest from "../../jestConfig";
import httpStatus from 'http-status';
import { connectPrisma, deleteAllData, disconnectPrisma } from "../../factories/scenary-factory";
import { states } from "@prisma/client";

const server = serverSupertest();

beforeEach( async() => {
    await connectPrisma();
    await deleteAllData();
});

describe('TEST GET /states', () => { 
    it(`Should answer 200 and return 27 states of Brazil`, async() => { 
        const { status, body }: { status: number, body: states[] } = await server.get('/states').send({});

        expect(status).toBe(httpStatus.OK);
        expect(body).toBeInstanceOf(Array);
        expect(body).toHaveLength(27);

    });
});

afterAll(async() => { 
    await disconnectPrisma();
});