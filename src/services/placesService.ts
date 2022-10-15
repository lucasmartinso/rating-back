import { cities, foodPlaces, states, typeFoodPlaces } from "@prisma/client";
import * as placeRepository from "../repositories/placeRepository";
import * as localizationRepository from "../repositories/localizationRepository";
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

async function findPlace(id: number): Promise<boolean> { 
  const place: foodPlaces | null = await placeRepository.findPlace(id);

  if(!place) throw { type: "Not Found", message:"This place isn't registred at the database"}

  return place.verify;
}

export async function updateVerify(id: number) { 
  const verify: boolean = await findPlace(id);
  if(verify) throw { type: "Bad Request", message:"This place is already verify"}

  await placeRepository.updateVerify(id);
}

export async function updateWebsite(id: number,website: string) { 
  await findPlace(id);
  await placeRepository.updateWebsite(id,website);
}

export async function updateDescription(id: number,description: string) { 
  await findPlace(id);
  await placeRepository.updateDescription(id,description);
}

export async function getPlaceWithRatings(placeId: number): Promise<any> {
  const place: any[] = await placeRepository.getPlaceWithComments(placeId);

  if(place.length !== 0) {
    return place.map(element => element.json_build_object);
  } else { 
    const place: foodPlaces | null = await placeRepository.findPlace(placeId);
    return place;
  }
}

export async function search(name: string): Promise<any> { 
  const places: any = await placeRepository.searchPlace(name);

  return places;
}

export async function getStates(): Promise<states[]> {
  const states: states[] = await localizationRepository.getStates();

  return states;
}

export async function getCities(): Promise<cities[]> {
  const cities: cities[] = await localizationRepository.getCities();

  return cities;
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