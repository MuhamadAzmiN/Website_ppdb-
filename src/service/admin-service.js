import { prismaClient } from "../app/database.js"
import { validate } from "../validation/validation.js";
import { deleteValidationAdmin, updateValidationAdmin, UserketeranganLulusValidation } from "../validation/admin-validation.js";
import { ResponseError } from "../error/response-error.js";



const getAllDaftar = async () => {
    const result =  await prismaClient.daftar.findMany({
        select : {
            id : true,
            nama_lengkap : true,
            asal_sekolah : true,
            jurusan : true,
            no_hp : true,
            alamat : true,
            user : {
                select : {
                    email : true
                }

            }
    }
    });


    console.log(result)


    return result


}





const updateDaftar = async (user,request) => {
    const daftar = validate(updateValidationAdmin, request);


    return prismaClient.daftar.update({
        where : {
            id : daftar.id
        },
        data : {
            nama_lengkap : daftar.nama_lengkap,
            asal_sekolah : daftar.asal_sekolah,
            jurusan : daftar.jurusan,
            no_hp : daftar.no_hp,
            alamat : daftar.alamat,
        },
        select : {
            id : true,
            nama_lengkap : true,
            asal_sekolah : true,
            jurusan : true,
            no_hp : true,
            alamat : true
        }
    })
}









const deleteDaftar = async (id) => {
    const daftar = validate(deleteValidationAdmin, id);


    const totalDaftarInDsatabase = await prismaClient.daftar.count({
        where : {
            id : daftar
        }
    })


    if(totalDaftarInDsatabase == 0){
        throw new ResponseError(404, "Daftar not found")
    }
    
    return prismaClient.daftar.delete({
        where : {
            id : daftar
        }
    })

}


const getAllUser = async () => {
    const result = await prismaClient.user.findMany({
        select : {
            id : true,
            username : true,
            email : true,
            name : true,
            role : true,
            keterangan_lulus : true,
            keterangan_pembayaran : true,
            keterangan_daftar: true

        }
    })



    if(result.length == 0){
        throw new ResponseError(404, "User not found")
    }



    return result
}



 const userketeranganLulus = async (id) => {
    const user = validate(UserketeranganLulusValidation, id)
    
    const existingUser = await prismaClient.user.findUnique({
        where : {
            id : user
        }
    })
    

    if(!existingUser) {
        throw new ResponseError(404, "User not found")
    }


    if(existingUser.keterangan_lulus == true){
        throw new ResponseError(400, "User already lulus")
    }


    return prismaClient.user.update({
        where : {
            id : user
        },
        data : {
            keterangan_lulus : true
        }
    })
    
 }
 
 







 













export default {
    getAllDaftar,
    updateDaftar,
    deleteDaftar,
    getAllUser,
    userketeranganLulus
}