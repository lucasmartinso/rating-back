import joi from "joi"

export const restaurantSchema = joi.object({
    name: joi.string().min(2).max(30).required(), 
    description: joi.string(),
    website: joi.string().uri(),
    mainPhoto: joi.string().uri().required(),
    type: joi.string().required(),
    city: joi.string().min(2).max(50).required(),
    address: joi.string().required()
})

export const websiteSchema = joi.object({ 
    website: joi.string().uri().required()
})

export const descriptionSchema = joi.object({ 
    description: joi.string().required()
})