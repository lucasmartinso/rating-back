import { foodPlaces, ratingFoodPlaces, typeFoodPlaces } from "@prisma/client";
import * as ratingRepository from "../repositories/ratingRepository"
import "dayjs/locale/pt-br.js";
import dayjs from "dayjs";

async function verifyRatingTime(userId: number, foodPlaceId: number) { 
  const ratingsUser: ratingFoodPlaces[] | null = await ratingRepository.verifyRatingTime(userId,foodPlaceId);
  const date: string = ratingsUser[0].createdAt.toString();
  const now = dayjs().locale("pt-br");
  const hoje = now.format("ddd, DD MMMM YY");
  console.log(hoje);
  console.log(date.substring(16,18))
  //if(date.substring(8))
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