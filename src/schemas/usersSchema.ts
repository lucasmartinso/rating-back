import joi from "joi"

export const signupSchema = joi.object({
    name: joi.string().pattern(/^[a-zA-Z" "]{2,30}$/).required().label('Invalid name, allows only letters and spaces'), 
    username: joi.string().pattern(/^[a-zA-Z0-9".""_""-"]{2,30}$/).required().label('Invalid username, allows only letters, numbers, ".","_","-"'), 
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().label('Invalid email, has to follow email format **@**.com or **@**.net'), 
    password: joi.string().min(8).max(50).required(), 
    confirmPassword: joi.string().min(8).max(50).required(), 
    mainPhoto: joi.string().uri()
})

export const loginSchema = joi.object({
    usernameEmail: joi.string().pattern(/^[a-zA-Z0-9".""_""@""-"]{2,}$/).required(),
    password: joi.string().min(8).max(50).required()
})

export const updatePhotoSchema = joi.object({
    mainPhoto: joi.string().uri().required()
}); 