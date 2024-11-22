import Joi from "joi";

const registerUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required(), 
})


const loginUserValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(100).required()
})

const getUserValidation = Joi.string().max(100).required()

const logoutUserValidation = Joi.object({
    token : Joi.string().max(100).required()
})




export  {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    logoutUserValidation
}