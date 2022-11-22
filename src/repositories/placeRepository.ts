import { foodPlaces, typeFoodPlaces } from "@prisma/client";
import connection from "../databases/postgres";
import prisma from "../databases/prisma";

export async function existType(type: string): Promise<typeFoodPlaces | null>  { 
    const foodType: typeFoodPlaces | null = await prisma.typeFoodPlaces.findUnique({ where: {name: type}});

    return foodType;
}

export async function existName(name: string): Promise<foodPlaces | null> { 
    const foodPlace: foodPlaces | null = await prisma.foodPlaces.findUnique({where: {name}});

    return foodPlace;
}

export async function existAddress(address: string): Promise<foodPlaces | null> { 
    const foodPlace: foodPlaces | null = await prisma.foodPlaces.findUnique({where: {address}});

    return foodPlace;
}

export async function existWebsite(website: string): Promise<foodPlaces | null> { 
    const foodPlace: foodPlaces | null = await prisma.foodPlaces.findUnique({where: {website}});

    return foodPlace;
}

export async function createPlace(placeData: Omit<foodPlaces, 'id' | 'score' | 'verify'>) { 
    await prisma.foodPlaces.create({data : placeData})
}

export async function findPlace(id: number): Promise<foodPlaces | null> { 
    const foodPlace: foodPlaces | null = await prisma.foodPlaces.findUnique({where: {id}});

    return foodPlace;
}

export async function updateVerify(id: number): Promise<void> { 
    await prisma.foodPlaces.update({where: {id}, data: {verify: true}})
}

export async function updateWebsite(id: number,website: string): Promise<void> { 
    await prisma.foodPlaces.update({where: {id}, data: {website}})
}

export async function updateDescription(id: number,description: string): Promise<void> { 
    await prisma.foodPlaces.update({where: {id}, data: {description}})
}

export async function getPlaceWithComments(id: number): Promise<any> { 
    const {rows: place}: any = await connection.query(`
        SELECT json_build_object(
            'id',fp.id,
            'name',fp.name,
            'score',fp.score,
            'description',fp.description,
            'website',fp.website,
            'mainPhoto',fp."mainPhoto",
            'address',fp.address,
            'type', t.name,
            'city',c.name,
            'verify',fp.verify,
            'food', AVG(r.food),
            'attendance', AVG(r.attendance),
            'environment', AVG(r.environment),
            'price', AVG(r.price),
            'ratings', json_agg(json_build_object(
                'userId', u.id,
                'username', u.username, 
                'name', u.name,
                'mainPhoto', u."mainPhoto",
                'food', r.food, 
                'environment', r.environment, 
                'attendance', r.attendance, 
                'price', r.price,
                'comment', r.comment
            )))
        FROM "foodPlaces" fp
        JOIN "ratingFoodPlaces" r ON r."foodPlaceId"=fp.id
        JOIN cities c ON c.id = fp."cityId"
        JOIN "typeFoodPlaces" t ON t.id = fp."typeId"
        JOIN users u ON u.id = r."userId"
        WHERE fp.id = $1
        GROUP BY fp.id, r."foodPlaceId",c.name,t.name
    `,[id]);

    return place;
}

export async function searchPlace(name : string): Promise<any> {
    const { rows: places }: any = await connection.query({
    text:`SELECT * FROM "foodPlaces"
        WHERE name ILIKE ($1)
        OFFSET 0 LIMIT 5
    `,values: [`${name}%`]});

    return places;
}