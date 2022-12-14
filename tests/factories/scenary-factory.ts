import { Prisma } from "@prisma/client";
import prisma from "../../src/databases/prisma";

export async function deleteAllData(): Promise<void> { 
    await prisma.$transaction([
        prisma.ratingFoodPlaces.deleteMany({}),
        prisma.foodPlaces.deleteMany({}),
        prisma.users.deleteMany({}), 
    ],
    {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
    });
} 

export async function disconnectPrisma(): Promise<void> { 
    await prisma.$disconnect();
} 

export async function connectPrisma(): Promise<void> {
    await prisma.$connect();
}