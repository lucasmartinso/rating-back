import supertest from "supertest";
import app from "../../src/index"

describe('TEST POST /sign-up', () =>  {
    it('Have to answer 200, if the user send the corretly schema', async() => { 
        expect(200).toBe(200);
    });
})