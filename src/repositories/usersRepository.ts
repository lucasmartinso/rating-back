import { users } from "@prisma/client";
import prisma from "../databases/prisma"
import { createUser } from "../types/usersType";

export async function createUser(userData: createUser) {
    await prisma.users.create({ data: userData });
}

export async function verifyRepeteadUsername(username: string) {
    const repeteadOrNot: users | null = await prisma.users.findUnique({ where: { username }});

    return repeteadOrNot;
}