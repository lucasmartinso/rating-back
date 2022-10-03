import { ratingFoodPlaces } from "@prisma/client";
import { Request, Response } from "express"
import * as ratingService from "../services/ratingService"
import { ratingInfo } from "../types/ratingType";

export async function createRating(req: Request, res: Response) { 
    const user = res.locals.user;
    const id: number = Number(req.params.id);
    const ratingInfo: ratingInfo = req.body;
    const ratingData: Omit<ratingFoodPlaces, 'id' | 'createdAt'> = { 
        foodPlaceId: id,
        userId: user.id,
        food: ratingInfo.food,
        environment: ratingInfo.environment,
        attendance: ratingInfo.attendance,
        price: ratingInfo.price,
        comment: ratingInfo.comment || null
    }

    const average: number = await ratingService.createRanting(ratingData);
    await ratingService.updateScore(id,average);
    res.sendStatus(200);
} 

export async function getPlaces(req: Request, res: Response) { 
    
    res.status(200).send("Oi");
}