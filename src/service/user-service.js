import { request } from "express"
import { prismaClient } from "../app/database.js"
import bcrypt from "bcrypt"
import { registerUserValidation, loginUserValidation } from "../validation/user-validation.js"
import { ResponseError } from "../error/response-error.js"
import { validate } from "../validation/validation.js";
import { valid } from "joi"
import {v4 as uuid} from "uuid"

const register = async (request) => {
    const user =validate(registerUserValidation, request)
    console.log(request)
    

    const countUser = await prismaClient.user.count({
        where: { 
           email: user.email
         }
    });
    
    if (countUser === 1) {
        throw new ResponseError(400, "Username already exist");
    }

    user.password = await bcrypt.hash(user.password, 10);
    const result = await prismaClient.user.create({
        data : user,
        select : {
            username : true,
            email : true,
            name : true,
            asal_sekolah : true,
            jurusan : true,
            nik : true

        }
    })

    return result
}


const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request)
    const user = await prismaClient.user.findUnique({
        where : {
            email : loginRequest.email
        },
        select : {
            email : true,
            password : true
        }
    })


   


    if(!user) {
        throw new ResponseError(404, "User not found")
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)


    if(!isPasswordValid) {
        throw new ResponseError(401, "Invalid password")
    }


    const token = uuid().toString()
    return prismaClient.user.update({
        data : {
            token : token
        },
        where : {
            email : user.email
        },
        select : {
            token : true
        }
    })
}



export default {
    register,
    login
}