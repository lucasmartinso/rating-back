import { users } from "@prisma/client";
import { Request, Response } from "express"
import * as usersService from "../services/usersService"

export async function signup(req: Request, res: Response) { 
    const userData: users = req.body
    await usersService.signup(userData)
    res.sendStatus(200);
} 

export async function login(req: Request, res: Response) { 
    res.sendStatus(200);
} 