import connection from "../databases/postgres";
import { querie } from "../utils/query";

export async function worstRatingFood(): Promise<any[]> {
    const { rows: worstAttendance }: any = await connection.query(`
        ${querie} ORDER BY attendance
    `);
   
    return worstAttendance;
} 

export async function bestRatingFood(): Promise<any[]> {
    const { rows: bestAttendance }: any = await connection.query(`
        ${querie} ORDER BY attendance DESC
    `);
   
    return bestAttendance;
} 