import { cities, states } from "@prisma/client";
import prisma from "../databases/prisma"

export async function getStates(): Promise<states[]> {
    const states: states[] = await prisma.states.findMany({where: {}});

    return states;
}

export async function getCities(): Promise<cities[]> {
    const cities: cities[] = await prisma.cities.findMany({where: {}});

    return cities;
}

//export async function 