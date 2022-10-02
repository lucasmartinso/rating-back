import { cities, foodPlaces, typeFoodPlaces } from "@prisma/client"
import prisma from "../databases/prisma"

export async function existCity(city: string): Promise<cities | null> { 
    const cities: cities | null = await prisma.cities.findFirst({where: {name: city}});

    return cities;
}

export async function existType(type: string): Promise<typeFoodPlaces | null>  { 
    const foodType: typeFoodPlaces | null = await prisma.typeFoodPlaces.findUnique({ where: {name: type}});

    return foodType;
}

export async function existName(name: string) { 
    const foodPlace: foodPlaces | null = await prisma.foodPlaces.findUnique({where: {name}});

    return foodPlace;
}

export async function createPlace(placeData: Omit<foodPlaces, 'id' | 'score' | 'verify'>) { 
    await prisma.foodPlaces.create({data : placeData})
}