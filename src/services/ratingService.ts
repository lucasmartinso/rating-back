import { foodPlaces, ratingFoodPlaces, typeFoodPlaces } from "@prisma/client";
import * as ratingRepository from "../repositories/ratingRepository";
import * as placeRepository from "../repositories/placeRepository"
import "dayjs/locale/pt-br.js";
import dayjs from "dayjs";
import { transformMonth } from "../utils/transformMonth";
import * as foodRepository from "../repositories/foodRepository";
import * as enviromentRepository from "../repositories/enviromentRepository";
import * as attendanceRepository from "../repositories/attendanceRepository";
import * as priceRepository from "../repositories/priceRepository";
import * as foodTypeRepository from "../repositories/foodTypeRepository";
import redis from "../databases/redis";

async function verifyRatingTime(userId: number, foodPlaceId: number): Promise<void> { 
  const ratingsUser: ratingFoodPlaces[] | null = await ratingRepository.verifyRatingTime(userId,foodPlaceId);

  if(ratingsUser.length>= 5) throw { type: "Bad Request", message: "You reached the limit of rating this restaurant"}

  if(ratingsUser.length>0) {
    const date: string = ratingsUser[0].createdAt.toString();
    const day: number = Number(date.substring(8,10)); 
    const month: number = transformMonth.transform(date.substring(4,7));
    const year: number = Number(date.substring(11,15));

    const now : dayjs.Dayjs = dayjs().locale("pt-br");
    const hoje: string = now.format("DD-MM-YYYY");
    const today: number = Number(hoje.substring(0,2));
    const monthNow: number = Number(hoje.substring(3,5))
    const yearNow: number = Number(hoje.substring(6,10));

    if(today-day<=2 && month===monthNow && yearNow===year) { 
      throw { type: "Bad Request", message: "You have to await 72h to rating this restaurant again"}
    }
  }
}

async function verifyPlace(id: number): Promise<void> { 
  const foodPlace: foodPlaces | null = await ratingRepository.findPlace(id); 

  if(!foodPlace) throw { type: "Not Found", message: "This place doesn't exist at databse"}
}

export async function createRanting(ratingData: Omit<ratingFoodPlaces, 'id' | 'createdAt'>): Promise<number> {
  await verifyPlace(ratingData.foodPlaceId);
  await verifyRatingTime(ratingData.userId,ratingData.foodPlaceId);
  const average: number = (ratingData.food + ratingData.price + ratingData.environment + ratingData.attendance)/4;

  await ratingRepository.createRating(ratingData);

  return average;
}

export async function updateScore(foodPlaceId: number,average: number): Promise<void> { 
  const ratings: ratingFoodPlaces[] | null = await ratingRepository.allRatingsPlace(foodPlaceId);
  const actualRating: foodPlaces | null = await placeRepository.findPlace(foodPlaceId);
  await verifyPlace(foodPlaceId);

  if(actualRating && ratings && ratings.length>0){
    const score: number = (((ratings.length-1) * Number(actualRating.score)) + average)/(ratings.length);
    await ratingRepository.updatePlaceScore(foodPlaceId,score.toString());
  }
}

function organize(places: any, placesWithoutRating: any) {
  for(let i=0; i<placesWithoutRating.length; i++) { 
    places.push(placesWithoutRating[i]);
  }

  return places;
}

export async function getAllPlacesRating(): Promise<any[]> {
  const places: any[] = await ratingRepository.getAllPlacesRating();
  const placesWithoutRating: any = await ratingRepository.placesWithoutRating();

  const allPlaces: any[] = organize(places,placesWithoutRating);

  return allPlaces;
}

function cachesKey(key: string, order: string): string { 
  const cacheKey: string = `${key}?${order}`;

  return cacheKey;
}

function expirateTime(): number { 
  const expirationTime: number = 1000 * 60 * 10;

  return expirationTime;
}

async function cache(key: string, order: string): Promise<string | null> { 
  const cached: string | null = await redis.get(cachesKey(key,order));

  return cached;
}

export async function getFilterByFood(order: string) {
  const key: string = 'food';
  if(order === 'last') {
    const cachedFood: string | null = await cache(key,order);
    if(cachedFood) return JSON.parse(cachedFood);

    else {
      const worstFood: any = await foodRepository.worstRatingFood();
      await redis.setEx(cachesKey(key,order),expirateTime(),JSON.stringify(worstFood));
      return worstFood;
    }
    
  } else if(order === 'best') { 
    const cachedFood: string | null = await cache(key,order);
    if(cachedFood) return JSON.parse(cachedFood);

    else {
      const bestFood: any = await foodRepository.bestRatingFood();
      await redis.setEx(cachesKey(key,order),expirateTime(),JSON.stringify(bestFood));
      return bestFood;
    }
  }
}

export async function getFilterByEnviroment(order: string) {
  const key: string = 'environment';
  if(order === 'last') {
    const cachedEnvironment: string | null = await cache(key,order);
    if(cachedEnvironment) return JSON.parse(cachedEnvironment);

    const worstEnviroment: any = await enviromentRepository.worstRatingEnviroment();
    await redis.setEx(cachesKey(key,order),expirateTime(),JSON.stringify(worstEnviroment));
    return worstEnviroment;

  } else if(order === 'best') { 
    const cachedEnvironment: string | null = await cache(key,order);
    if(cachedEnvironment) return JSON.parse(cachedEnvironment);
  
    const bestEnviroment: any = await enviromentRepository.bestRatingEnviroment();
    await redis.setEx(cachesKey(key,order),expirateTime(),JSON.stringify(bestEnviroment));
    return bestEnviroment;
  }
}

export async function getFilterByAttendance(order: string) {
  const key: string = 'attendance';
  if(order === 'last') {
    const cachedAttendance: string | null = await cache(key,order);
    if(cachedAttendance) return JSON.parse(cachedAttendance);
    
    const worstAttendance: any = await attendanceRepository.worstRatingAttendance();
    await redis.setEx(cachesKey(key,order),expirateTime(),JSON.stringify(worstAttendance));
    return worstAttendance;

  } else if(order === 'best') { 
    const cachedAttendance: string | null = await cache(key,order);
    if(cachedAttendance) return JSON.parse(cachedAttendance);

    const bestAttendance: any = await attendanceRepository.bestRatingAttendance();
    await redis.setEx(cachesKey(key,order),expirateTime(),JSON.stringify(bestAttendance));
    return bestAttendance;
  }
}

export async function getFilterByPrice(order: string) {
  const key: string = 'price';
  if(order === 'last') {
    const cachedPrice: string | null = await cache(key,order);
    if(cachedPrice) return JSON.parse(cachedPrice);

    const worstPrice: any = await priceRepository.worstRatingPrice();
    await redis.setEx(cachesKey(key,order),expirateTime(),JSON.stringify(worstPrice));
    return worstPrice;

  } else if(order === 'best') { 
    const cachedPrice: string | null = await cache(key,order);
    if(cachedPrice) return JSON.parse(cachedPrice);

    const bestPrice: any = await priceRepository.bestRatingPrice();
    await redis.setEx(cachesKey(key,order),expirateTime(),JSON.stringify(bestPrice));
    return bestPrice;
  }
}

export async function getFilterByFoodType(typeId: number) { 
  const placesTypeFood: any = await foodTypeRepository.filterFoodType(typeId);

  if(placesTypeFood.length === 0) throw { type: "Not Found", message: "None restaurant with that type has been registred yet"}

  return placesTypeFood;
}