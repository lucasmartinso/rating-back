import connection from "../databases/postgres";
import { querie } from "../utils/query";

export async function worstRatingEnviroment(): Promise<any[]> {
    const { rows: worstEnviroment }: any = await connection.query(`
        ${querie} ORDER BY environment
    `);
   
    return worstEnviroment;
} 

export async function bestRatingEnviroment(): Promise<any[]> {
    const { rows: bestEnviroment }: any = await connection.query(`
        ${querie} ORDER BY environment DESC
    `);
   
    return bestEnviroment;
} 