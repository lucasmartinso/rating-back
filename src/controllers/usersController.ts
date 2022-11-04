import { users } from "@prisma/client";
import { Request, Response } from "express"
import * as usersService from "../services/usersService"
import { signIn, signUp, userData } from "../types/usersType";
import axios from "axios";
import qs from "querystring";

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
    const GITHUB_ACCESS_TOKEN_URL: string = 'https://github.com/login/oauth/access_token';
    const { REDIRECT_URL, CLIENT_ID, CLIENT_SECRET } = process.env;
    const params: object = {
        code, 
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URL,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
    };

    const { data } = await axios.post(GITHUB_ACCESS_TOKEN_URL, params, {
        headers: {
          'Content-Type': 'application/json'
        }
    });

    const parsedData
}

export async function updateMainPhoto(req: Request, res: Response) { 
    const { mainPhoto }: {mainPhoto: string} = req.body;
    const { id }: {id:number} = res.locals.user;

    await usersService.updatePhoto(id,mainPhoto);
    res.sendStatus(200);
}