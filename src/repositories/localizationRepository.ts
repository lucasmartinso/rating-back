import { cities, states, typeFoodPlaces } from "@prisma/client";
import prisma from "../databases/prisma"

export async function getStates(): Promise<states[]> {
    const states: states[] = await prisma.states.findMany({where: {}});

    return states;
}

export async function getCities(id: number): Promise<cities[]> {
    const cities: cities[] = await prisma.cities.findMany({where: {state_id: id}});

    return cities;
}

export async function getTypes(): Promise<typeFoodPlaces[]> {
    const types = await prisma.typeFoodPlaces.findMany({where: {}});

    return types;
}