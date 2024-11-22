
import { validate } from "../validation/validation.js"
import { prismaClient } from "../app/database.js"
import { daftarValidation, getDaftarValidation } from "../validation/daftar-validation.js"
import { ResponseError } from "../error/response-error.js";



const daftar = async (user, request) => {
    const daftar = validate(daftarValidation, request);
    daftar.userId = user.id;

    // Simpan data ke databaseb
    return await prismaClient.daftar.create({
        data: daftar,
        select: {
            nama_lengkap: true,
            asal_sekolah: true,
            jurusan: true,
            no_hp: true,
            alamat: true
        }
    });
};


const getDaftarUser = async (user, daftarId) => {
    daftarId = parseInt(daftarId, 10);  // Pastikan menjadi integer
    daftarId = validate(getDaftarValidation, daftarId)
    console.log(daftarId)
    const daftar = await prismaClient.daftar.findFirst({
        where: {
            userId: user.id,
            id: daftarId
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



    console.log(daftar)
    
    if(!daftar){
        throw new ResponseError(404, "Daftar not found")
    }


    return daftar
}


export default {
    daftar,
    getDaftarUser
}