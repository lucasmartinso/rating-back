import { cities, foodPlaces, ratingFoodPlaces, typeFoodPlaces, users } from "@prisma/client"
import prisma from "../databases/prisma"

export async function findPlace(id: number): Promise<foodPlaces | null> { 
    const foodPlace: foodPlaces | null = await prisma.foodPlaces.findUnique({where: {id}});

    return foodPlace;
}

export async function createRating(ratingData:  Omit<ratingFoodPlaces, 'id' | 'createdAt'>) { 
    await prisma.ratingFoodPlaces.create({data: ratingData})
}