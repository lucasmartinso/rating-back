import { cities, foodPlaces, typeFoodPlaces } from "@prisma/client";
import * as placeRepository from "../repositories/placeRepository"
import { placeInfo } from "../types/placesType";

async function verifyCity(city: string): Promise<number> { 
  const cities: cities | null = await placeRepository.existCity(city);

  if(!cities) throw { type: "Not Found", message:"This city isn't registred at the database"}

  return cities.id;
}

async function verifyType(type: string): Promise<number> { 
  const typeFood: typeFoodPlaces | null = await placeRepository.existType(type);

  if(!typeFood) throw { type: "Not Found", message:"This type food isn't registred at the database"}

  return typeFood.id;
}

export async function createPlace(placeData: placeInfo): Promise<void> {
    const cityId: number = await verifyCity(placeData.city);
    const typeId: number = await verifyType(placeData.type);

    //const place: foodPlaces
    //}

    //await placeRepository.createPlace();
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