import { users } from "@prisma/client";
import prisma from "../databases/prisma"
import { createUser } from "../types/usersType";

export async function createUser(userData: createUser): Promise<void> {
    await prisma.users.create({ data: userData });
}

export async function verifyExistUsername(username: string): Promise<users | null> {
    const existUsername: users | null = await prisma.users.findUnique({ where: { username }});

    return existUsername;
} 

export async function verifyExistEmail(email: string): Promise<users | null> {
    const existEmail: users | null = await prisma.users.findUnique({ where: { email }});

    return existEmail;
}

export async function findUser(userId: number): Promise<users | null> { 
    const user: users | null = await prisma.users.findUnique({where: {id: userId}});

    return user;
} 

export async function updateMainPhoto(id: number, mainPhoto: string) { 
    await prisma.users.update({ where: { id }, data: { mainPhoto }})
}