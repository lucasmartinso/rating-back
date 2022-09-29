import { users } from "@prisma/client";
import prisma from "../databases/prisma"
import { createUser } from "../types/usersType";

export async function createUser(userData: createUser) {
    await prisma.users.create({ data: userData });
}

export async function verifyExistUsername(username: string) {
    const existUsername: users | null = await prisma.users.findUnique({ where: { username }});

    return existUsername;
} 

export async function verifyExistEmail(email: string) {
    const existEmail: users | null = await prisma.users.findUnique({ where: { email }});

    return existEmail;
}