import * as localizationRepository from "../repositories/localizationRepository";
import { cities, states } from "@prisma/client";

export async function getStates(): Promise<states[]> {
    const states: states[] = await localizationRepository.getStates();
  
    return states;
  }
  
  export async function getCities(id: number,name: string): Promise<cities[]> {
    if(!name) name= "";
    const cities: cities[] = await localizationRepository.getCities(id,name);
  
    return cities;
  }