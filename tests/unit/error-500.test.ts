import { jest } from '@jest/globals';
import serverSupertest from "../jestConfig";
import httpStatus from 'http-status';
import * as ratingService from '../../src/services/ratingService';
import { signIn } from '../../src/types/usersType';
import { __createLogin } from '../factories/login-factory';
import { faker } from '@faker-js/faker';

const server = serverSupertest();

beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
}); 
  
afterEach(() => {
    jest.restoreAllMocks();
});

describe("Has to fail but a different error that isnt't in the error midleware", () => { 
    it("Have to answer 500 if route doesn't exist ", async() => { 
        const randomNumber: number = Number(faker.random.numeric(3));

        jest.spyOn(ratingService, 'getFilterByFoodType').mockImplementation((): any => {
            return 500
        }); 

        const { status }: { status: number, text: string } = await server.get(`/places/food-type/${randomNumber}`).send({});

        expect(status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
    }); 
}); 