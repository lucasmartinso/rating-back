import { cities, states } from "@prisma/client";
import prisma from "../databases/prisma";
import connection from "../databases/postgres";

export async function getStates(): Promise<states[]> {
    const states: states[] = await prisma.states.findMany({where: {}});

    return states;
}

export async function getCities(id: number,name: string): Promise<any[]> {
    const { rows: cities }: any = await connection.query({
    text:`SELECT * FROM cities
        WHERE "state_id"= $1 AND name ILIKE ($2)
        OFFSET 0 LIMIT 5
    `,values: [id,`${name}%`]});
    
    return cities;
}