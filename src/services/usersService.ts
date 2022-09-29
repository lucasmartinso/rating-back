import { users } from "@prisma/client";
import * as usersRepository from "../repositories/usersRepository"
import { createUser, signUp } from "../types/usersType";

async function verifyExistUsername(username: string): Promise<users | null> { 
    const usernameExist: users | null = await usersRepository.verifyExistUsername(username);
    
    return usernameExist;
} 

async function verifyExistEmail(email: string): Promise<users | null> { 
    const emailExist: users | null = await usersRepository.verifyExistEmail(email);

    return emailExist;
}

export async function signup(userData: signUp) {
    const usernameExist: users | null = await verifyExistUsername(userData.username);
    if(usernameExist) throw { type: "Conflit", message: "This username already exist"}

    const emailExist: users | null = await verifyExistEmail(userData.email);
    if(emailExist) throw { type: "Conflit", message: "This email is registred yet"}

    const userWithoutConfirmPassword: createUser = exclude(userData,'confirmPassword');

    await usersRepository.createUser(userWithoutConfirmPassword);
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