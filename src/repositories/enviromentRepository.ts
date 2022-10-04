import connection from "../databases/postgres";
import { querie } from "../utils/query";

export async function worstRatingFood(): Promise<any[]> {
    const { rows: worstEnviroment }: any = await connection.query(`
        ${querie} ORDER BY enviroment
    `);
   
    return worstEnviroment;
} 

export async function bestRatingFood(): Promise<any[]> {
    const { rows: bestEnviroment }: any = await connection.query(`
        ${querie} ORDER BY enviroment DESC
    `);
   
    return bestEnviroment;
} 