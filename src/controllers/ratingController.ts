import { ratingFoodPlaces, typeFoodPlaces } from "@prisma/client";
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
    const places: any[] = await ratingService.getAllPlacesRating();
    
    res.status(200).send(places);
}

export async function foodPlaces(req: Request, res: Response) {
    const type: string = req.params.type; 
    const placeFilterFood: any = await ratingService.getFilterByFood(type);
    
    res.status(200).send(placeFilterFood);
}

export async function attendancePlaces(req: Request, res: Response) {
    const type: string = req.params.type; 
    const placeFilterAttendance: any = await ratingService.getFilterByAttendance(type);
    
    res.status(200).send(placeFilterAttendance);
}

export async function enviromentPlaces(req: Request, res: Response) {
    const type: string = req.params.type; 
    const placeFilterEnvironment: any = await ratingService.getFilterByEnviroment(type);
    
    res.status(200).send(placeFilterEnvironment);
}

export async function pricePlaces(req: Request, res: Response) {
    const type: string = req.params.type; 
    const placeFilterPrice: any = await ratingService.getFilterByPrice(type);
    
    res.status(200).send(placeFilterPrice);
}

export async function filterFoodType(req: Request, res: Response) {
    const type: number = Number(req.params.typeId); 
    const placeFilterTypeFood: any = await ratingService.getFilterByFoodType(type);
    
    res.status(200).send(placeFilterTypeFood);
}