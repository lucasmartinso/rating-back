import { Request, Response } from "express";
import * as placesService from "../services/placesService"
import { placeInfo } from "../types/placesType";

export async function createPlaces(req: Request, res: Response) { 
    const placeData: placeInfo = req.body;

    await placesService.createPlace(placeData);
    res.sendStatus(201);
}