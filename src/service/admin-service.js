import { prismaClient } from "../app/database.js"
import { validate } from "../validation/validation.js";
import { deleteValidationAdmin, updateValidationAdmin } from "../validation/admin-validation.js";
import { ResponseError } from "../error/response-error.js";



const getAllDaftar = async () => {
    const result =  await prismaClient.daftar.findMany({
        select : {
            id : true,
            nama_lengkap : true,
            asal_sekolah : true,
            jurusan : true,
            no_hp : true,
            alamat : true
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
            alamat : daftar.alamat
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

















export default {
    getAllDaftar,
    updateDaftar,
    deleteDaftar
}