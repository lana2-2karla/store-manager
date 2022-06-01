const Joi = require('joi');

const productsValidation = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).required(),
}).messages({
    'any.required': '{{#label}} is required',
    'string.base': '{{#label}} length must be at least 5 characters long',
    'number.base': '{{#label}} must be greater than or equal to 1',
});

const productsValidateMiddleware = async (req, res, next) => {
    const { error } = productsValidation.validate(req.body);
    if (error) {
        const { type, message } = error.details[0];
        return type === 'any.required'
        ? res.status(400).json({ message })
        : res.status(422).json({ message });
    }
    next();
};

module.exports = productsValidateMiddleware;