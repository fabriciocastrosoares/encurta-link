import joi from "joi";

export const registerUserSchema = joi.object({
    name: joi.string().min(2).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.any().valid(joi.ref('password')).required().messages({'any.only': 'senhas não são iguais!'})
});

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});
