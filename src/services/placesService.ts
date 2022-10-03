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

async function verifyName(name: string): Promise<void> { 
  const foodPlace: foodPlaces | null = await placeRepository.existName(name); 

  if(foodPlace) throw { type: "Conflit", message: "This place's name already exists"}
}

export async function createPlace(placeData: placeInfo): Promise<void> {
    const cityId: number = await verifyCity(placeData.city);
    const typeId: number = await verifyType(placeData.type);
    await verifyName(placeData.name);

    const place: Omit<foodPlaces, 'id' | 'score' | 'verify'> = { 
      name: placeData.name,
      description: placeData.description || null,
      website: placeData.website || null,
      mainPhoto: placeData.mainPhoto,
      address: placeData.address,
      typeId: typeId,
      cityId: cityId
    }

    await placeRepository.createPlace(place);
}

export async function updateVerify(id: number) { 
  await placeRepository.updateVerify(id);
}

export async function updateWebsite(id: number,website: string) { 
  await placeRepository.updateWebsite(id,website);
}

export async function updateDescription(id: number,description: string) { 
  await placeRepository.updateDescription(id,description);
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