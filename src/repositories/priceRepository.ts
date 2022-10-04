import connection from "../databases/postgres";
import { querie } from "../utils/query";

export async function worstRatingPrice(): Promise<any[]> {
    const { rows: worstPrice }: any = await connection.query(`
        ${querie} ORDER BY price
    `);
   
    return worstPrice;
} 

export async function bestRatingPrice(): Promise<any[]> {
    const { rows: bestPrice }: any = await connection.query(`
        ${querie} ORDER BY price DESC
    `);
   
    return bestPrice;
} 