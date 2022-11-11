import * as localizationService from "../services";
import { cities, states } from "@prisma/client";
import { Request, Response } from "express";

export async function getStates(req: Request, res: Response): Promise<void> {
    const states : states[] = await placesService.getStates();

    res.status(200).send(states);
}

export async function getCities(req: Request, res: Response): Promise<void> {
    const id: number = Number(req.params.id);
    const { city }: any = req.query;
    
    const cities : cities[] = await placesService.getCities(id,city);

    res.status(200).send(cities);
}