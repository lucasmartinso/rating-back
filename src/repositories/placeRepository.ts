import { cities, foodPlaces, typeFoodPlaces } from "@prisma/client"
import prisma from "../databases/prisma"

export async function existCity(city: string) { 
    const cities: cities | null = await prisma.cities.findFirst({where: {name: city}});

    return cities;
}

export async function existType(type: string) { 
    const foodType: typeFoodPlaces | null = await prisma.typeFoodPlaces.findUnique({ where: {name: type}});

    return foodType;
}

export async function createPlace(placeData: foodPlaces) { 
    await prisma.foodPlaces.create({data : placeData})
}