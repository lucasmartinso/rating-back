import serverSupertest from "../jestConfig";
import httpStatus from 'http-status';
import { connectPrisma, disconnectPrisma, disconnectRedis } from "../factories/scenary-factory";

const server = serverSupertest();

beforeEach( async() => {
    await connectPrisma();
});

describe('TEST SCHEMAS POST /sign-up', () => { 
    it('Should answer 422 and return ', async () => { 
        expect(422).toBe(httpStatus.UNPROCESSABLE_ENTITY)
    });
})

afterAll(async() => { 
    await disconnectPrisma();
    await disconnectRedis();
});