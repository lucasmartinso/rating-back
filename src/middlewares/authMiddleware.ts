import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function validateTokenAuth(req:Request, res: Response, next: NextFunction) { 
    const token = req.headers['authorization'];

    if(!token) throw { type: "Unauthorized", message: "Insert token to enter"}
    
    try { 
        const SECRET: string = process.env.TOKEN_SECRET_KEY ?? ''; 
        const { userId } = jwt.verify(token,SECRET) as { userId: number}
        const user: users | null = await 
        res.locals.user = user;
        next();
    } catch(error) { 
        throw { type: "Unauthorized", message: "Invalid token"}; 
    }
}