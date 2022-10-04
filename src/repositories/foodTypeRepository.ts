import connection from "../databases/postgres";
import { querie } from "../utils/query";

export async function worstRatingAttendance(typeId: number): Promise<any[]> {
    const { rows: typePlaces }: any = await connection.query(`
        ${querie} WHERE fp."typeId"= $1
    `,[typeId]);
   
    return typePlaces;
} 