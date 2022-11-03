import serverSupertest from "../jestConfig";
import httpStatus from 'http-status';
import { connectPrisma, disconnectPrisma, disconnectRedis, deleteAllData } from "../factories/scenary-factory";
import { faker } from "@faker-js/faker";
import { signIn } from "../../src/types/usersType";
import { __createUser } from "../factories/sign-up-factory";

const server = serverSupertest();

beforeEach( async() => {
    await connectPrisma();
    await deleteAllData();
});

describe('TEST SCHEMAS POST /sign-up', () => { 
    it('Should answer 422, if user send name that doesn`t match with the pattern or is null', async () => { 

    });
});

afterAll(async() => { 
    await disconnectPrisma();
    await disconnectRedis();
});