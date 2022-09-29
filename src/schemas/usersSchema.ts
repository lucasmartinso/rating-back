import joi from "joi"

export const signupSchema = joi.object({
    name: joi.string().pattern(/^[a-zA-Z]{2,30}/).required(), 
    username: joi.string().pattern(/^[a-zA-Z0-9".""_""-"]{2,30}/).required(), 
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(), 
    password: joi.string().min(8).max(50).required(), 
    confirmPassword: joi.string().min(8).max(50).required(), 
    mainPhoto: joi.string().uri()
})

export const loginSchema = joi.object({
    usernameEmail: joi.string().pattern(/^[a-zA-Z0-9".""_""@""-"]{2,}/).required(),
    password: joi.string().min(8).max(50).required()
})