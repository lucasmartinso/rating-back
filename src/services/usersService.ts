import { users } from "@prisma/client";
import * as usersRepository from "../repositories/usersRepository"
import { createUser, signUp, userData } from "../types/usersType";
import { crypts } from "../utils/cripts/crypts"
import jwt from "jsonwebtoken"

async function verifyExistUsername(username: string): Promise<users | null> { 
    const usernameExist: users | null = await usersRepository.verifyExistUsername(username);
    
    return usernameExist;
} 

async function verifyExistEmail(email: string): Promise<users | null> { 
    const emailExist: users | null = await usersRepository.verifyExistEmail(email);

    return emailExist;
}

function passwordConfirmPasswordMatch(password: string, confirmPassword: string): void { 
    if(password!==confirmPassword) throw { type: "Conflit", message: "The password and confirmPassord don't match"}
}

export async function signup(userData: signUp): Promise<void> {
    passwordConfirmPasswordMatch(userData.password,userData.confirmPassword);

    const usernameExist: users | null = await verifyExistUsername(userData.username);
    if(usernameExist) throw { type: "Conflit", message: "This username already exist"}

    const emailExist: users | null = await verifyExistEmail(userData.email);
    if(emailExist) throw { type: "Conflit", message: "This email is registred yet"}

    userData = {...userData, password: crypts.encriptByBcrypt(userData.password)}
    const userWithoutConfirmPassword: createUser = exclude(userData,'confirmPassword');

    await usersRepository.createUser(userWithoutConfirmPassword);
}

function matchPassword(passEncrypt: string, password: string): void { 
    const verify: boolean = crypts.descriptByBcrypt(passEncrypt,password);

    if(!verify) throw { type: "Unauthorized", message: "User or password are wrong"}
}

function gerateToken(userId: number,email: string): string {
    const SECRET: string = process.env.TOKEN_SECRET_KEY ?? '';
    const EXPERIES_IN: string | undefined = process.env.EXPERIES_IN

    const payload: object = {
        userId, 
        email, 
        level: 1
    }

    const jwtConfig: object = { 
        expiresIn: EXPERIES_IN
    }

    const token: string = jwt.sign(payload,SECRET,jwtConfig);

    return token;
}

export async function login(usernameEmail: string, password: string): Promise<{ user: userData; token: string;} | undefined> { 
    const existEmail: users | null = await verifyExistEmail(usernameEmail);
    const existUsername: users | null =  await verifyExistUsername(usernameEmail);
    console.log(existEmail);
    console.log(existUsername);

    if(!existEmail && !existUsername) throw { type: "Unauthorized", message: "User or password are wrong"}

    if(existEmail) {
        const passEncrypt: string  = existEmail.password;
        matchPassword(passEncrypt,password);
        const token: string = gerateToken(existEmail.id,existEmail.email);

        return { 
            user: { 
                id: existEmail.id,
                name: existEmail.name,
                username: existEmail.username,
                mainPhoto: existEmail.mainPhoto
            },
            token: token
        };

    } else if(existUsername) {
        const passEncrypt: string  = existUsername.password;
        matchPassword(passEncrypt,password);
        const token: string = gerateToken(existUsername.id,existUsername.email);
        
        return { 
            user: existUsername,
            token: token
        }
    }
}

function exclude<User, Key extends keyof User>(
    user: User,
    ...keys: Key[]
  ): Omit<User, Key> {
    for (let key of keys) {
      delete user[key]
    }
    return user
  }