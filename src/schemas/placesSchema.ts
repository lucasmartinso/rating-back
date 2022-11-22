import joi from "joi"

export const restaurantSchema = joi.object({
    name: joi.string().min(2).max(30).required().label('Name must be between 2 and 30 characters'), 
    description: joi.string().label('Description needs to be string and brief'),
    website: joi.string().uri().label('Website needs to be in url format'),
    mainPhoto: joi.string().uri().required().label('Photo needs to be in url format'),
    type: joi.string().required().label('Unavailable type'),
    city: joi.string().required().label('Unavailable city'),
    address: joi.string().required().label('Unavailable address')
})

export const websiteSchema = joi.object({ 
    website: joi.string().uri().required().label('Website needs to be in url format')
})

export const descriptionSchema = joi.object({ 
    description: joi.string().required().label('Description needs to be string and brief')
})