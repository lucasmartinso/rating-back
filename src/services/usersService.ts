import { users } from "@prisma/client";
import * as usersRepository from "../repositories/usersRepository"

export async function signup(userData: users) {
    await usersRepository.createUser(userData);
}