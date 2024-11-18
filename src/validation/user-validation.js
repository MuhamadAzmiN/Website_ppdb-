import Joi from "joi";

const registerUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required(),
    asal_sekolah: Joi.string().max(100).required(),
    jurusan: Joi.string().max(100).required(),
    nik: Joi.number().required()
})


const loginUserValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(100).required()
})

export  {
    registerUserValidation,
    loginUserValidation
}