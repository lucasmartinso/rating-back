import prisma from "../../src/databases/prisma";

export async function deleteAllData(): Promise<void> { 
    await prisma.$transaction([
        prisma.$executeRaw`TRUNCATE TABLE recommendations`
    ]);
} 

export async function disconnectPrisma(): Promise<void> { 
    await prisma.$disconnect();
} 

export async function connectPrisma(): Promise<void> {
    await prisma.$connect();
}