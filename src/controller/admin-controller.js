import e from "express"
import adminService from "../service/admin-service.js"


const getAllDaftar = async (req,res,next) => {
    try {
        const result = await adminService.getAllDaftar()
        res.status(200).json({
            data : result
        })
    }catch (error) {
        next(error)
    }
}



const updateDaftar = async (req,res,next) => {
    try {
        const user = req.user
        const daftarId = req.params.id
        const request = req.body
        request.id = daftarId
        const result = await adminService.updateDaftar(req.user, req.body)
        res.status(200).json({
            data : result
        })
    }catch (error) {
        next(error)
    }
}


const deleteDaftar = async (req,res,next) => {
    try{

        const daftarId = req.params.id
        const result = await adminService.deleteDaftar(daftarId)
        res.status(200).json({
            data : "Data dengan nama lengkap " + result.nama_lengkap + " berhasil dihapus"
        })
    }catch (error) {
        next(error)
    }
}






export default {
    getAllDaftar,
    updateDaftar,
    deleteDaftar
}