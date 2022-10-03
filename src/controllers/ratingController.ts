import { ratingFoodPlaces } from "@prisma/client";
import { Request, Response } from "express"
import * as ratingService from "../services/ratingService"

export async function createRating(req: Request, res: Response) { 
    const user = res.locals.user;
    const id: number = Number(req.params.id);
    const ratingInfo: ratingFoodPlaces = req.body;//criar type
    const ratingData: Omit<ratingFoodPlaces, 'id' | 'createdAt'> = { 
        foodPlaceId: id,
        userId: user.id,
        food: ratingInfo.food,
        environment: ratingInfo.environment,
        attendance: ratingInfo.attendance,
        price: ratingInfo.price,
        comment: ratingInfo.comment || null
    }

    await ratingService.createRanting(ratingData);
    res.sendStatus(200);
}