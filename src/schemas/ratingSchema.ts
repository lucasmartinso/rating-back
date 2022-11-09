import joi from "joi";

export const ratingSchema = joi.object({
    food: joi.number().integer().min(1).max(5).required(),
    environment: joi.number().integer().min(1).max(5).required(),
    attendance: joi.number().integer().min(1).max(5).required(),
    price: joi.number().integer().min(1).max(5).required(),
    comment: joi.string().allow(null)
})