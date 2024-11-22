import { prismaClient } from "../src/app/database";
import bcrypt from "bcrypt"


export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where : {
            username : "test"
        }
    })
}


export const createTestUser = async () => {
    // Hapus user dengan email 'test@gmail.com' jika ada
    await prismaClient.user.deleteMany({
        where: {
            email: "test@gmail.com"
        }
    });

    // Buat user baru
    return await prismaClient.user.create({
        data: {
            username: "test",
            email: "test@gmail.com",
            password: await bcrypt.hash("test", 10),
            name: "test",
            token: "test",
        }
    });
};


export const getTestUser = async () => {
    return await prismaClient.user.findUnique({
      where: {
        email: "test@gmail.com",
      },
    });
  };
  


export const removeAllTextDaftar =  async () => {
    await prismaClient.daftar.deleteMany({
        where : {
            nama_lengkap : "test"
        }
    })
}

      

export const createTestDaftar = async () => {
    // Pastikan createTestUser berhasil dan mendapatkan user yang valid
    const testUser = await createTestUser();
    
    if (!testUser || !testUser.id) {
        throw new Error('Test user creation failed or invalid user ID');
    }
  
    await prismaClient.daftar.create({
        data: {
            nama_lengkap: "test",
            asal_sekolah: "test",
            jurusan: "test",
            no_hp: "081234567890",
            alamat: "test",
            user: {
                connect: {
                    id: testUser.id,  // Gunakan id user yang valid
                }
            }
        },
    });
};


export const getTestDaftar = async () => {
    try {
        const result = await prismaClient.daftar.findFirst({
            where: {
                nama_lengkap: "test"
            }
        });
        return result;
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw new Error("Failed to fetch data from database");
    }
}
