import { ratingFoodPlaces } from "@prisma/client";
import { Request, Response } from "express"

export async function createRating(req: Request, res: Response) { 
    const ratingData: ratingFoodPlaces = req.body;

    res.sendStatus(200);
}