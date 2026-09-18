const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().allow("", null),
    category: Joi.string().required()
}).required();



// module.exports.reviewSchema = Joi.object({

//     rating:Joi.number().required().min(1).max(5),
//     review:Joi.string().required()

// }).required()

module.exports.reviewSchema = Joi.object({
    rating: Joi.number().required().min(1).max(5),
    review: Joi.string().required()
}).required();