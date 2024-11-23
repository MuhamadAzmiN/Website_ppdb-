import { prismaClient } from "../app/database.js";

export const adminMiddleware = async (req, res, next) => {
    // Mengambil token dari header Authorization
    const token = req.get('Authorization');
  
    if (!token) {
        return res.status(401).json({
            errors: "Unauthorized"
        });
    }

    try {
        // Mencari pengguna berdasarkan token
        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            }
        });

        // Jika tidak ditemukan pengguna dengan token tersebut
        if (!user) {
            return res.status(401).json({
                errors: "Unauthorized"
            });
        }

        // Memeriksa apakah pengguna adalah admin
        if (user.role !== 'admin') {
            return res.status(403).json({
                errors: "Forbidden, only admins can access this resource"
            });
        }

        // Jika pengguna adalah admin, lanjutkan ke request berikutnya
        next();
    } catch (error) {
        // Menangani error yang terjadi selama proses
        console.error(error);
        return res.status(500).json({
            errors: "Internal Server Error"
        });
    }
};
