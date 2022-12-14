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

export interface signIn { 
    usernameEmail: string;
    password: string;
} 

export type userData = Omit<users, 'createdAt' | 'email' | 'password'>

export interface tokenType { 
    user: object;
    token: string;
}