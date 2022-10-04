import { cities, foodPlaces, ratingFoodPlaces, typeFoodPlaces, users } from "@prisma/client"
import prisma from "../databases/prisma"
import connection from "../databases/postgres";

export async function findPlace(id: number): Promise<foodPlaces | null> { 
    const foodPlace: foodPlaces | null = await prisma.foodPlaces.findUnique({where: {id}});

    return foodPlace;
}

export async function verifyRatingTime(userId: number, foodPlaceId: number) { 
    const ratings: ratingFoodPlaces[] | null = await prisma.ratingFoodPlaces.findMany({where: {userId, foodPlaceId},orderBy: {createdAt: 'desc'}});

    return ratings;
} 

export async function createRating(ratingData:  Omit<ratingFoodPlaces, 'id' | 'createdAt'>): Promise<void> { 
    await prisma.ratingFoodPlaces.create({data: ratingData})
}

export async function allRatingsPlace(foodPlaceId: number): Promise<ratingFoodPlaces[] | null> { 
    const ratings: ratingFoodPlaces[] | null = await prisma.ratingFoodPlaces.findMany({where: {foodPlaceId}});

    return ratings
}

export async function updatePlaceScore(foodPlaceId: number,score: string) { 
    await prisma.foodPlaces.update({where: {id: foodPlaceId}, data: {score}});
}

export async function getAllPlacesRating(): Promise<any[]> {
    const { rows: places }: any = await connection.query(`
        SELECT fp.id, fp.name, fp.score, fp."mainPhoto", AVG(r.food) AS food, AVG(r.environment) AS environment, AVG(r.attendance) AS attendance, AVG(r.price) AS price, t.name, fp.verify 
        FROM "foodPlaces" fp
        JOIN "ratingFoodPlaces" r ON r."foodPlaceId"=fp.id
        JOIN "typeFoodPlaces" t ON t.id=fp."typeId"
        GROUP BY fp.id, t.name
    `)
   
    return places;
} 

export async function placesWithoutRating() { 
    const { rows: placesWithoutRating }: any = await connection.query(`
    SELECT fp.id, fp.name, fp.score, fp."mainPhoto",t.name, fp.verify 
    FROM "foodPlaces" fp
    JOIN "typeFoodPlaces" t ON t.id=fp."typeId"
    WHERE fp.score = '0'
    GROUP BY fp.id, t.name
    `)

    return placesWithoutRating;
}

export async function worstRatingFood(): Promise<any[]> {
    const { rows: worstFood }: any = await connection.query(`
        SELECT fp.id, fp.name, fp.score, fp."mainPhoto", AVG(r.food) AS food, AVG(r.environment) AS environment, AVG(r.attendance) AS attendance, AVG(r.price) AS price, t.name, fp.verify 
        FROM "foodPlaces" fp
        JOIN "ratingFoodPlaces" r ON r."foodPlaceId"=fp.id
        JOIN "typeFoodPlaces" t ON t.id=fp."typeId"
        GROUP BY fp.id, t.name
        ORDER BY food
    `);
   
    return worstFood;
} 