import connection from "../databases/postgres";

export async function worstRatingFood(): Promise<any[]> {
    const { rows: worstFood }: any = await connection.query(`
        ${querie} ORDER BY food
    `);
   
    return worstFood;
} 

export async function bestRatingFood(): Promise<any[]> {
    const { rows: bestFood }: any = await connection.query(`
        ${querie} ORDER BY food DESC
    `);
   
    return bestFood;
} 