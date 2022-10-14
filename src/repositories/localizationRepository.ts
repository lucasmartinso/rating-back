import { states } from "@prisma/client";
import prisma from "../databases/prisma"

export async function getStates() {
    const states: states[] = await prisma.states.findMany({where: {}});

    return states;
}