import Joi from 'joi';

export class SignUpValidator {
    static validator = Joi.object({
        name: Joi.string().min(2).max(50).required()
            .messages({
                'string.min': ' name must be greater than 2 characters',
                'string.max': ' name must be less than 50 characters',
                'any.required': ' name is required'
            }),
        email: Joi.string().email().required()
            .messages({
                'string.email': 'Please enter a valid email address',
                'any.required': 'Email is required'
            }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
            .messages({
                'string.pattern.base': 'Password must contain only alphanumeric characters',
                'any.required': 'Password is required'
            }),
        phone: Joi.number().required()
            .messages({
                'any.required': 'Phone number is required'
            }),
    });
}