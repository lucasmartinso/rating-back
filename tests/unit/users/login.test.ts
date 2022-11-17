import { jest } from '@jest/globals';
import * as usersRepository from '../../../src/repositories/usersRepository'
import * as usersService from '../../../src/services/usersService';
import { signIn } from '../../../src/types/usersType';
import { __createLogin } from '../../factories/login-factory';
import { crypts } from "../../../src/utils/cripts/crypts";

beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
}); 
  
afterEach(() => {
    jest.restoreAllMocks();
});

describe('UNIT TESTS login', () => { 
    it(`Have denied permission because the user password don't match or email are wrong`, async() => {
        const userData: signIn = await __createLogin();

        jest.spyOn(usersRepository, 'verifyExistEmail').mockImplementation((): any => {
            return false;
        });

        jest.spyOn(usersRepository, 'verifyExistUsername').mockImplementation((): any => {
            return false;
        });

        const promise = usersService.login(userData.usernameEmail,userData.password);

        expect(promise).rejects.toEqual({
            type: 'Unauthorized', 
            message: "User or password are wrong"
        }); 

        expect(usersRepository.verifyExistEmail).toBeCalled();
        expect(usersRepository.verifyExistUsername).not.toBeCalled();
    });

    it(`Username exist and have to check password`, async() => {
        const userData: signIn = await __createLogin();

        jest.spyOn(usersRepository, 'verifyExistEmail').mockImplementation((): any => {
            return false;
        });

        jest.spyOn(usersRepository, 'verifyExistUsername').mockImplementation((): any => {
            return true;
        });

        jest.spyOn(crypts, 'descriptByBcrypt').mockImplementation((): any => {
            return true;
        });

        await usersService.login(userData.usernameEmail,userData.password);

        expect(usersRepository.verifyExistEmail).toBeCalled();
        expect(usersRepository.verifyExistUsername).toBeCalled();
    });
});