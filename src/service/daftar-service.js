
import { validate } from "../validation/validation.js"
import { prismaClient } from "../app/database.js"
import { daftarValidation, getDaftarValidation } from "../validation/daftar-validation.js"
import { ResponseError } from "../error/response-error.js";



const daftar = async (user, request) => {
    const daftar = validate(daftarValidation, request);
    daftar.userId = user.id;



    const countDaftar = await prismaClient.daftar.count({
        where: {
            userId: user.id
        }
    })


    if(countDaftar == 1){
        throw new ResponseError(400, "Daftar already exist")
    }
    

   const createDaftar = await prismaClient.daftar.create({
        data : daftar,
    select : {
            id : true,
            nama_lengkap : true,
            asal_sekolah : true,
            jurusan : true,
            no_hp : true,
            alamat : true
        }
    })
    


    await prismaClient.user.update({
        where : {
            id : user.id
        },
        data : {
            keterangan_daftar : true
        }
    })



    return createDaftar
};



const getDaftarUser = async (user, namaLengkap) => {
    // Validasi input nama_lengkap
    namaLengkap = validate(getDaftarValidation, namaLengkap);
    console.log(namaLengkap);

    // Cari daftar berdasarkan userId dan nama_lengkap
    const daftar = await prismaClient.daftar.findFirst({
        where: {
            userId: user.id,
            nama_lengkap: namaLengkap
        },
        select: {
            id: true,
            nama_lengkap: true,
            asal_sekolah: true,
            jurusan: true,
            no_hp: true,
            alamat: true
        }
    })

    // Jika daftar tidak ditemukan
    if (!daftar) {
        throw new ResponseError(404, "Daftar not found");
    }

    return daftar;
};




















export default {
    daftar,
    getDaftarUser
}

