import { jest } from '@jest/globals';
import * as placeRepository from '../../../src/repositories/placeRepository'
import * as placesService from '../../../src/services/placesService';
import { signIn } from '../../../src/types/usersType';
import { __createLogin } from '../../factories/login-factory';
import { crypts } from "../../../src/utils/cripts/crypts";
import { faker } from '@faker-js/faker';

beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
}); 
  
afterEach(() => {
    jest.restoreAllMocks();
});

describe('UNIT TESTS about get place', () => { 
    it(`Have to return a place that isn't has reviews`, async() => {
        const randomNumber: number = Number(faker.random.numeric());

        jest.spyOn(placeRepository, 'getPlaceWithComments').mockImplementation((): any => {
            return [];
        });

        jest.spyOn(placeRepository, 'findPlace').mockImplementation((): any => {
            return {
                id: 1,
                name: 'Five Stars',
                score: '5',
                description: null,
                website:  null,
                mainPhoto: 'fivestars.jpg',
                address: 'rua jose, 256',
                typeId: 1,
                cityId: 1,
                verify: false
            };
        });

        await placesService.getPlaceWithRatings(randomNumber);

        expect(placeRepository.getPlaceWithComments).toBeCalled();
        expect(placeRepository.findPlace).toBeCalled();
        expect(placeRepository.existCityId).toBeCalled();
    });
});