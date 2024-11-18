import { prismaClient } from "../src/app/database";
import bcrypt from "bcrypt"


export const removeTestUser = async () => [
    await prismaClient.user.deleteMany({
        where : {
            username : "test"
        }
    })
]



export const createTestUser = async () => {
    await prismaClient.user.create({
        data : {
            username : "test",
            email : "test@gmail.com",
            password : await bcrypt.hash("test", 10),
            name : "test",
            token : "test",
            asal_sekolah : "test",
            jurusan : "test",
            nik : 1
        }
    })
}