import Joi from "joi";


const daftarValidation = Joi.object({
    nama_lengkap: Joi.string().required(),
    asal_sekolah: Joi.string().required(),
    jurusan: Joi.string().required(),
    no_hp: Joi.string().required(),
    alamat: Joi.string().required(),
});

const getDaftarValidation = Joi.string().required(); // Nama lengkap seharusnya string



export {
    daftarValidation,
    getDaftarValidation
}


