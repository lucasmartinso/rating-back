import * as usersRepository from "../repositories/usersRepository"
import { createUser, signUp, userData } from "../types/usersType";

export async function signup(userData: signUp): Promise<void> {

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