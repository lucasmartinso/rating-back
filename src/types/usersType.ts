import { users } from "@prisma/client";

export interface signUp { 
    name: string;
    username: string; 
    email: string; 
    password: string; 
    confirmPassword: string; 
    mainPhoto: string;
}

export type createUser = Omit<users, 'id' | 'createdAt'>