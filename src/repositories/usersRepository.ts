import prisma from "../databases/prisma"
import { createUser } from "../types/usersType";

export async function createUser(userData: createUser) {
    await prisma.users.create({ data: userData });
}