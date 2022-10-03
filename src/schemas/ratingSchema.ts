import joi from "joi";

export const ratingSchema = joi.object({
    food: joi.number().integer().min(1).max(5),
    environment: joi.number().integer().min(1).max(5),
    attendance: joi.number().integer().min(1).max(5),
    price: joi.number().integer().min(1).max(5),
    comment: joi.string()
})