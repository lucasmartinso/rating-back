import { foodPlaces, ratingFoodPlaces, typeFoodPlaces } from "@prisma/client";
import * as ratingRepository from "../repositories/ratingRepository"
import "dayjs/locale/pt-br.js";
import dayjs from "dayjs";

async function verifyRatingTime(userId: number, foodPlaceId: number) { 
  const ratingsUser: ratingFoodPlaces[] | null = await ratingRepository.verifyRatingTime(userId,foodPlaceId);
  const date: string = ratingsUser[0].createdAt.toString();
  const day: number = Number(date.substring(8,10))

  const now : dayjs.Dayjs = dayjs().locale("pt-br");
  const hoje: string = now.format("DD-MMM-YYYY");
  const today: number = Number(hoje.substring(0,2));
  const yearNow: number = Number(hoje.substring(6,10));
  console.log(date);
  console.log(hoje);
  console.log(date.substring(16,18))
  if(day===today) { 

  }
}

async function verifyPlace(id: number): Promise<void> { 
  const foodPlace: foodPlaces | null = await ratingRepository.findPlace(id); 

  if(!foodPlace) throw { type: "Not Found", message: "This place doesn't exist at databse"}
}

export async function createRanting(ratingData: Omit<ratingFoodPlaces, 'id' | 'createdAt'>): Promise<void> {
  await verifyPlace(ratingData.foodPlaceId);
  await verifyRatingTime(ratingData.userId,ratingData.foodPlaceId);

  //await ratingRepository.createRating(ratingData);
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