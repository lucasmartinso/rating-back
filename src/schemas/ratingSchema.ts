import joi from "joi";

export const ratingSchema = joi.object({
    food: joi.number().integer().min(1).max(5).required().label('Food field has to be a number'),
    environment: joi.number().integer().min(1).max(5).required().label('Environment field has to be a number'),
    attendance: joi.number().integer().min(1).max(5).required().label('Attendance field has to be a number'),
    price: joi.number().integer().min(1).max(5).required().label('Price field has to be a number'),
    comment: joi.string().allow(null)
})