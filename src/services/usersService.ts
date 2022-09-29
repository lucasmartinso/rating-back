import { users } from "@prisma/client";
import * as usersRepository from "../repositories/usersRepository"
import { createUser, signUp } from "../types/usersType";

async function verifyRepeteadUsername(username: string): Promise<void> { 
    const repeteadOrNot: users | null = await usersRepository.verifyRepeteadUsername(username);

    if(repeteadOrNot) throw { type: "Conflit", message: "This username already exist"}
}

export async function signup(userData: signUp) {
    await verifyRepeteadUsername(userData.username);
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