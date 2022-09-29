import { users } from "@prisma/client";
import * as usersRepository from "../repositories/usersRepository"
import { createUser, signUp } from "../types/usersType";
import { crypts } from "../utils/cripts/crypts"

async function verifyExistUsername(username: string): Promise<users | null> { 
    const usernameExist: users | null = await usersRepository.verifyExistUsername(username);
    
    return usernameExist;
} 

async function verifyExistEmail(email: string): Promise<users | null> { 
    const emailExist: users | null = await usersRepository.verifyExistEmail(email);

    return emailExist;
}

function passwordConfirmPasswordMatch(password: string, confirmPassword: string) { 
    if(password!==confirmPassword) throw { type: "Conflit", message: "The password and confirmPassord don't match"}
}

export async function signup(userData: signUp) {
    passwordConfirmPasswordMatch(userData.password,userData.confirmPassword);

    const usernameExist: users | null = await verifyExistUsername(userData.username);
    if(usernameExist) throw { type: "Conflit", message: "This username already exist"}

    const emailExist: users | null = await verifyExistEmail(userData.email);
    if(emailExist) throw { type: "Conflit", message: "This email is registred yet"}

    userData = {...userData, password: crypts.encriptByBcrypt(userData.password)}
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