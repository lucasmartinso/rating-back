import { Request, Response } from "express";

export async function createPlaces(req: Request, res: Response) { 
    const placeData = req.body;

    res.sendStatus(201);
}