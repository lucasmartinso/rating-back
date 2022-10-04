import { foodPlaces, ratingFoodPlaces, typeFoodPlaces } from "@prisma/client";
import * as ratingRepository from "../repositories/ratingRepository";
import * as placeRepository from "../repositories/placeRepository"
import "dayjs/locale/pt-br.js";
import dayjs from "dayjs";
import transform from "../utils/transformMonth";

async function verifyRatingTime(userId: number, foodPlaceId: number): Promise<void> { 
  const ratingsUser: ratingFoodPlaces[] | null = await ratingRepository.verifyRatingTime(userId,foodPlaceId);

  if(ratingsUser.length>= 5) throw { type: "Bad Request", message: "You reached the limit of rating this restaurant"}

  if(ratingsUser.length>0) {
    const date: string = ratingsUser[0].createdAt.toString();
    const day: number = Number(date.substring(8,10)); 
    const month: number = transform(date.substring(4,7));
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
  //await verifyRatingTime(ratingData.userId,ratingData.foodPlaceId);
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
    console.log(score);
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

export async function getWorstByFood() {
  const worstFood: any = await ratingRepository.worstRatingFood();
  
  return worstFood;
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