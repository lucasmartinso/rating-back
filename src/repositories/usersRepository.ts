import { users } from "@prisma/client";
import prisma from "../databases/prisma"

export async function createUser(userData: users) {
    await prisma.users.create({ data: userData });
}