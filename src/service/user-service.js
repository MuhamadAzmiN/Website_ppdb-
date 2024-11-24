import { request } from "express"
import { prismaClient } from "../app/database.js"
import bcrypt from "bcrypt"
import { registerUserValidation, loginUserValidation, getUserValidation } from "../validation/user-validation.js"
import { ResponseError } from "../error/response-error.js"
import { validate } from "../validation/validation.js";
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
            token : true
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



const getProfile = async (email) => {
    email = validate(getUserValidation, email)
    const user = await prismaClient.user.findUnique({
        where : {
            email : email
        },
        select : {
            email : true,
            name : true, 
            username : true,
            keterangan_lulus : true,
            keterangan_pembayaran : true
        
            
        }
    })





    console.log(user)


    if(!user) {
        throw new ResponseError(404, "User not found")
    }

    return user
}



const logout = async (email) => {
    email = validate(getUserValidation, email)
    const user = await prismaClient.user.findUnique({
        where : {
            email : email
        }
    })


    if(!user){
        throw new ResponseError(404, "User not found")
    }




    return prismaClient.user.update({
        where : {
            email : email
        },
        data : {
            token : null
        },
        select : {
            email : true
        }
    })
}






export default {
    register,
    login,
    getProfile,
    logout
}

