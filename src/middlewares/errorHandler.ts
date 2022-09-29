import { Request, Response, NextFunction } from "express"

export async function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    console.log(error);
    if(error.type === "Unprocessable Entity") { 
        return res.sendStatus(422);
    }
}