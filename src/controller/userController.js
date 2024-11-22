import { log } from "winston";
import userService from "../service/user-service.js";



const register = async (req,res,next) => {
    try {
        const result = await userService.register(req.body)
        res.status(201).json({
            data : result
        })
    }catch (error) {
        next(error)
    }
}


const login = async (req,res,next) => {
    try {
        const result = await userService.login(req.body)
        res.status(200).json({
            data : result
        })

    }catch (error) {
        next(error)
    }
}




const getProfile = async (req,res,next) => {
    try {
        const result = await userService.getProfile(req.user.email)
        res.status(200).json({
            data : result
        })
        console.log(result)
    }catch (error) {
        next(error)
    }
}


const logout = async (req,res,next) => {
    try {
        await userService.logout(req.user.email)
        res.status(200).send({
            data : "OK"
        })
    }catch(e)
    {
        next(e)
    }
}







export default {
    register,
    login,
    getProfile,
    logout
}