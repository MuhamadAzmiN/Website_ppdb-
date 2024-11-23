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



const getDaftarUser = async (req, res, next) => {
    try {
        const user = req.user; // Ambil informasi user login dari middleware
        console.log("User login:", user);

        const namaLengkap = req.params.nama_lengkap; // Ambil nama_lengkap dari parameter URL
        if (!namaLengkap) {
            return res.status(400).json({ message: "Nama lengkap is required" });
        }

        const result = await daftarService.getDaftarUser(user, namaLengkap); // Panggil service dengan nama_lengkap
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};









export default {
    daftar,
    getDaftarUser

}