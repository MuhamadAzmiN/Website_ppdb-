import Joi from "joi";



const getValidationAdmin = Joi.string().required(); // Nama lengkap seharusnya string


const updateValidationAdmin = Joi.object({
    id: Joi.number().positive().required(),
    nama_lengkap: Joi.string().required(),
    asal_sekolah: Joi.string().required(),
    jurusan: Joi.string().required(),
    no_hp: Joi.string().required(),
    alamat: Joi.string().required(),
});



const deleteValidationAdmin = Joi.number().positive().required();


export {
    getValidationAdmin,
    updateValidationAdmin,
    deleteValidationAdmin
}