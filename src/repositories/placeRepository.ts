import { foodPlaces } from "@prisma/client"
import prisma from "../databases/prisma"

export async function createPlace(placeData: foodPlaces) { 
    await prisma.foodPlaces.create({data : placeData})
}