import { jest } from '@jest/globals';
import * as usersRepository from '../../src/repositories/usersRepository'
import * as usersService from '../../src/services/usersService';
import { signUp } from '../../src/types/usersType';
import { __createUser } from '../factories/sign-up-factory';

beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
}); 
  
afterEach(() => {
    jest.restoreAllMocks();
});

describe('UNIT TESTS sign-up', () => { 
    it('Have to create a user', async() => {
        const userData: signUp = await __createUser();

        jest.spyOn(usersRepository, 'verifyExistUsername').mockImplementation((): any => {
            return false;
        });

        jest.spyOn(usersRepository, 'verifyExistEmail').mockImplementation((): any => {
            return false;
        });

        jest.spyOn(usersRepository, 'createUser').mockImplementation((): any => {});

        await usersService.signup(userData);

        expect(usersRepository.verifyExistEmail).toBeCalled();
        expect(usersRepository.verifyExistUsername).toBeCalled();
        expect(usersRepository.createUser).toBeCalled();
    });

    it('Have denied permission because already exist a user with that username', async() => {
        const userData: signUp = await __createUser();

        jest.spyOn(usersRepository, 'verifyExistUsername').mockImplementation((): any => {
            return true;
        });

        jest.spyOn(usersRepository, 'verifyExistEmail').mockImplementation((): any => {
            return false;
        });

        jest.spyOn(usersRepository, 'createUser').mockImplementation((): any => {});


        const promise = usersService.signup(userData);

        expect(promise).rejects.toEqual({
            type: 'Conflit', 
            message: "This username already exist"
        }); 

        expect(usersRepository.verifyExistUsername).toBeCalled();
        expect(usersRepository.verifyExistEmail).not.toBeCalled();
        expect(usersRepository.createUser).not.toBeCalled();
    })
});