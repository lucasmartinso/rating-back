import { foodPlaces, typeFoodPlaces } from "@prisma/client";
import { Request, Response } from "express";
import * as placesService from "../services/placesService"
import { placeInfo } from "../types/placesType";

export async function createPlaces(req: Request, res: Response) { 
    const placeData: placeInfo = req.body;

    await placesService.createPlace(placeData);
    res.sendStatus(201);
}

export async function updateVerify(req: Request, res: Response) { 
    const id: number = Number(req.params.id);

    await placesService.updateVerify(id);
    
    res.sendStatus(200);
} 

export async function updateWebsite(req: Request, res: Response) { 
    const id: number = Number(req.params.id);
    const website: string = req.body.website;

    await placesService.updateWebsite(id,website);

    res.sendStatus(200);
} 

export async function updateDescription(req: Request, res: Response) { 
    const id: number = Number(req.params.id);
    const description: string = req.body.description;

    await placesService.updateDescription(id,description);

    res.sendStatus(200);
}

export async function getPlace(req: Request, res: Response) { 
    const id: number = Number(req.params.id);

    const place: any | foodPlaces = await placesService.getPlaceWithRatings(id);

    res.status(200).send(place);
}

export async function searchPlace(req: Request, res: Response): Promise<any> { 
    const { name }: any = req.query;
    const places: any = await placesService.search(name);

    res.status(200).send(places)
}

export async function getTypes(req: Request, res: Response): Promise<void> {
    const types: typeFoodPlaces[] = await placesService.getTypes();

    res.status(200).send(types);
}