import { jest } from '@jest/globals';
import * as ratingRepository from '../../../src/repositories/ratingRepository'
import * as ratingService from '../../../src/services/ratingService';
import { __createRating } from '../../factories/rating-factory';
import { ratingInfo } from '../../../src/types/ratingType';
import { transformMonth } from "../../../src/utils/transformMonth";

beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
}); 
  
afterEach(() => {
    jest.restoreAllMocks();
});

describe('UNIT TESTS create rating', () => { 
    it(`Have denied permission because the user have reached reviews number about a especific restaurant`, async() => {
        const ratingData: ratingInfo = await __createRating();

        jest.spyOn(ratingRepository, 'findPlace').mockImplementation((): any => {
            return true;
        });

        jest.spyOn(ratingRepository, 'verifyRatingTime').mockImplementation((): any => {
            return [
                {
                    food: 5,
                    attendance: 5, 
                    environment: 5, 
                    price: 5
                }, 
                {
                    food: 5,
                    attendance: 5, 
                    environment: 5, 
                    price: 5
                }, 
                {
                    food: 5,
                    attendance: 5, 
                    environment: 5, 
                    price: 5
                }, 
                {
                    food: 5,
                    attendance: 5, 
                    environment: 5, 
                    price: 5
                },
                {
                    food: 5,
                    attendance: 5, 
                    environment: 5, 
                    price: 5
                }
            ];
        });

        jest.spyOn(ratingRepository, 'createRating').mockImplementation((): any => {});

        const promise = ratingService.createRanting({...ratingData, userId: 1, foodPlaceId: 1});

        expect(promise).rejects.toEqual({
            type: 'Bad Request', 
            message: "You reached the limit of rating this restaurant"
        }); 

        expect(ratingRepository.findPlace).toBeCalled();
        expect(ratingRepository.createRating).not.toBeCalled();
        expect(ratingRepository.verifyRatingTime).not.toBeCalled();
        
    });

    it(`Have denied permission because the user try to inject manual rating with date that the month doesn't correspondes a real`, async() => {
        const ratingData: ratingInfo = await __createRating();

        jest.spyOn(ratingRepository, 'findPlace').mockImplementation((): any => {
            return true;
        });

        jest.spyOn(ratingRepository, 'verifyRatingTime').mockImplementation((): any => {
            return [
                {   
                    id: 1,
                    food: 5,
                    attendance: 5, 
                    environment: 5, 
                    price: 5,
                    foodPlaceId: 1,
                    userId: 1,
                    createdAt: '2022-01-05T00:34:30.416Z'
                }
            ];
        });

        jest.spyOn(ratingRepository, 'createRating').mockImplementation((): any => {});

        const promise = ratingService.createRanting({...ratingData, userId: 1, foodPlaceId: 1});

        expect(promise).rejects.toEqual({
            type: 'Not Found', 
            message: "This month doesn't exist"
        }); 

        expect(ratingRepository.findPlace).toBeCalled();
        expect(ratingRepository.createRating).not.toBeCalled();
        expect(ratingRepository.verifyRatingTime).not.toBeCalled();
        
    });
});