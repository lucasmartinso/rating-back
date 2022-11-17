import { jest } from '@jest/globals';
import supertest from 'supertest';
import app from '../../src';

beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
}); 
  
afterEach(() => {
    jest.restoreAllMocks();
});

describe("Has to fail but a different error that isnt't in the error midleware", () => { 
    it("Have to answer 500 if route doesn't exist ", async() => {  
        jest.spyOn(errors, 'isAppError').mockImplementation((): any => {
            return undefined
        }); 

        const { status }: { status: number } = await supertest(app).get(`/recommendations/1`).send();
        
        expect(status).toBe(500);
    }); 
}); 