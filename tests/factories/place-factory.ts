import { faker }from "@faker-js/faker";
import { cities, typeFoodPlaces } from "@prisma/client";
import { placeInfo } from "../../src/types/placesType";
import prisma from "../../src/databases/prisma";

async function allCities(): Promise<cities[]> { 
    const cities: cities[] = await prisma.cities.findMany({});

    return cities;
}

async function allFoodType(): Promise<typeFoodPlaces[]> { 
    const foodType: typeFoodPlaces[] = await prisma.typeFoodPlaces.findMany({});

    return foodType;
}

export async function __createRestaurant(): Promise<placeInfo> {
    const city: cities = faker.helpers.arrayElement(await allCities());
    const foodType: typeFoodPlaces = faker.helpers.arrayElement(await allFoodType());

    const placeData: placeInfo = {
        name: faker.lorem.word(20),
        description: faker.company.bsAdjective(),
        website: faker.internet.url(),
        mainPhoto: faker.internet.url(),
        type: foodType.name,
        city: city.name,
        address: faker.address.streetAddress(true)
    }

    return placeData;
}