import daftarService from "../service/daftar-service.js"


const daftar = async (req,res,next) => {
    try {
        const result = await daftarService.daftar(req.user, req.body)
        res.status(201).json({
            data : result
        })
    }catch (error) {
        next(error)
    }
}



const getDaftarUser = async (req,res,next) => {
    try {
        const user = req.user
        console.log(user)
        const daftarId = req.params.daftarId
        const result = await daftarService.getDaftarUser(user, daftarId)
        res.status(200).json({
            data : result
        })
    }catch (error) {
        next(error)
    }
}






export default {
    daftar,
    getDaftarUser

}