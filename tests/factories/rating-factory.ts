import { faker }from "@faker-js/faker";
import { ratingInfo } from "../../src/types/ratingType";

export async function __createRating() {
    const ratingData: ratingInfo = {
        food: faker.datatype.number({min: 1, max: 5}),
        environment: faker.datatype.number({min: 1, max: 5}),
        attendance: faker.datatype.number({min: 1, max: 5}),
        price: faker.datatype.number({min: 1, max: 5}),
        comment: faker.lorem.words(3)
    }

    return ratingData;
}