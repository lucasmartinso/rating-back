import { users } from "@prisma/client";
import { Request, Response } from "express"
import * as usersService from "../services/usersService"
import { signIn, signUp } from "../types/usersType";

export async function signup(req: Request, res: Response) { 
    const userData: signUp = req.body;

    await usersService.signup(userData);

    res.sendStatus(201);
} 

export async function login(req: Request, res: Response) { 
    const { usernameEmail,password }: signIn = req.body;
    console.log(usernameEmail);

    const userData: {user: users, token: string} | undefined = await usersService.login(usernameEmail,password);
    
    res.status(200).send(userData);
} 

export async function updateMainPhoto(req: Request, res: Response) { 
    res.sendStatus(200);
}