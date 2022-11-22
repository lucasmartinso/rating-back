import { jest } from '@jest/globals';
import * as placeRepository from '../../../src/repositories/placeRepository'
import * as placesService from '../../../src/services/placesService';
import * as  localizationRepository from '../../../src/repositories/localizationRepository';
import { __createLogin } from '../../factories/login-factory';
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

        jest.spyOn(localizationRepository, 'existCityId').mockImplementation((): any => {
            return {
                id: 1,
                code: 1,
                name: 'Rio de Janeiro',
                state_id: 1,
            };
        });

        await placesService.getPlaceWithRatings(randomNumber);

        expect(placeRepository.getPlaceWithComments).toBeCalled();
        expect(placeRepository.findPlace).toBeCalled();
        expect(localizationRepository.existCityId).toBeCalled();
    });

    it(`Have to return a place that isn't has reviews`, async() => {
        const randomNumber: number = Number(faker.random.numeric());

        jest.spyOn(placeRepository, 'findPlace').mockImplementation((): any => {
            return {
                iid: 5,
                name: "Sushi",
                score: "0",
                description: "Sushi bar ",
                website: null,
                mainPhoto: "https://images.adsttc.com/media/images/5bf3/5d1c/08a5/e509/1100/014e/newsletter/FEATURE_IMAGE.jpg?1542675707",
                address: "Rua Iata, 321",
                typeId: 2,
                cityId: 3000,
                verify: false
            };
        });

        jest.spyOn(placeRepository, 'getPlaceWithComments').mockImplementation((): any => {
            return [
                {
                    id: 5,
                    name: "Sushi",
                    score: "0",
                    description: "Sushi bar ",
                    website: null,
                    mainPhoto: "https://images.adsttc.com/media/images/5bf3/5d1c/08a5/e509/1100/014e/newsletter/FEATURE_IMAGE.jpg?1542675707",
                    address: "Rua Iata, 321",
                    typeId: 2,
                    cityId: 3000,
                    verify: false,
                    city: "Juiz de Fora", 
                    food: 5,
                    attendance: 5,
                    environment: 5,
                    price: 5,
                    ratings: [
                    {
                        userId: 2,
                        username: "son",
                        name: "son",
                        mainPhoto: "https://images.adsttc.com/media/images/5bf3/5d1c/08a5/e509/1100/014e/newsletter/FEATURE_IMAGE.jpg?1542675707",
                        food: 5,
                        environment: 5,
                        attendance: 5,
                        price: 5,
                        comment: "All is good"
                    }
                    ]
                }
            ];
        });

        jest.spyOn(localizationRepository, 'existCityId').mockImplementation((): any => {});

        await placesService.getPlaceWithRatings(randomNumber);

        expect(placeRepository.getPlaceWithComments).toBeCalled();
        expect(placeRepository.findPlace).toBeCalled();
    });
});