import { __createUser } from "../../factories/sign-up-factory";
import serverSupertest from "../../jestConfig";
import httpStatus from 'http-status';
import { connectPrisma, deleteAllData, disconnectPrisma } from "../../factories/scenary-factory";
import { faker }from "@faker-js/faker";
import { placeInfo } from "../../../src/types/placesType";
import { __createRestaurant } from "../../factories/place-factory";
import { __createToken } from "../../factories/login-factory";

const server = serverSupertest();

beforeEach( async() => {
    await connectPrisma();
    await deleteAllData();
});

describe('TEST POST /places/create', () => { 
    it('Should answer 200, if the user send the corretly schema', async() => { 
    
    })
})

afterAll(async() => { 
    await disconnectPrisma();
});