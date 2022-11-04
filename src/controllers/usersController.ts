import { Request, Response } from "express"
import * as usersService from "../services/usersService"
import { signIn, signUp, userData } from "../types/usersType";
import * as oauthService from "../services/oauthServices";

export async function signup(req: Request, res: Response) { 
    const userData: signUp = req.body;

    await usersService.signup(userData);

    res.sendStatus(201);
} 

export async function login(req: Request, res: Response) { 
    const { usernameEmail,password }: signIn = req.body;

    const userData: {user: userData, token: string} | undefined = await usersService.login(usernameEmail,password);
    
    res.status(200).send(userData);
} 

export async function githubLogin(req: Request, res: Response) { 
    const code: any = req.query.code;
    await oauthService.github(code);
}

export async function updateMainPhoto(req: Request, res: Response) { 
    const { mainPhoto }: {mainPhoto: string} = req.body;
    const { id }: {id:number} = res.locals.user;

    await usersService.updatePhoto(id,mainPhoto);
    res.sendStatus(200);
}