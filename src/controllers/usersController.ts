import { users } from "@prisma/client";
import { Request, Response } from "express"
import * as usersService from "../services/usersService"
import { signUp } from "../types/usersType";

export async function signup(req: Request, res: Response) { 
    const userData: signUp = req.body
    await usersService.signup(userData);
    res.sendStatus(201);
} 

export async function login(req: Request, res: Response) { 
    res.sendStatus(200);
} 

export async function updateMainPhoto(req: Request, res: Response) { 
    res.sendStatus(200);
}