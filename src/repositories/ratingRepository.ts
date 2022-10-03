import { cities, foodPlaces, ratingFoodPlaces, typeFoodPlaces, users } from "@prisma/client"
import prisma from "../databases/prisma"

export async function findUser(id: number): Promise<users | null> { 
    const userData: users | null = await prisma.users.findUnique({where: {id}});

    return userData;
}

export async function findPlace(id: number): Promise<foodPlaces | null> { 
    const foodPlace: foodPlaces | null = await prisma.foodPlaces.findUnique({where: {id}});

    return foodPlace;
}

export async function createRating(ratingData: ratingFoodPlaces) { 
    await prisma.ratingFoodPlaces.create({data: ratingData})
}