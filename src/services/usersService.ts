import { users } from "@prisma/client";
import * as usersRepository from "../repositories/usersRepository"
import { createUser, signUp } from "../types/usersType";

export async function signup(userData: signUp) {
    const userWithoutConfirmPassword: createUser = exclude(userData,'confirmPassword')
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