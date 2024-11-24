import { prismaClient } from "../src/app/database";
import bcrypt from "bcrypt"
import { ResponseError } from "../src/error/response-error";


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
    
    return await prismaClient.daftar.findFirst({
        where: {
          nama_lengkap: "test",
        },
      });
}

 

export const createTestUserAdmin = async () => {
    await prismaClient.user.deleteMany({
        where: {
            email: "admin1@gmail.com"
        }
    });

    // Buat user baru
    return await prismaClient.user.create({
        data: {
            username: "admin1",
            email: "admin1@gmail.com",
            password: await bcrypt.hash("admin", 10),
            name: "admin1",
            token: "test",
            role : "admin"
        }
    });
}


export const getTestUserAdmin = async () => {
    return await prismaClient.user.findUnique({
      where: {
        email: "admin1@gmail.com",
    },
 });
};
  







export const createTestDaftarAdmin = async () => {
    // Pastikan createTestUser berhasil dan mendapatkan user yang valid
    const testUser = await createTestUserAdmin();
    
    if (!testUser || !testUser.id) {
        throw new Error('Test user creation failed or invalid user ID');
    }
  
    await prismaClient.daftar.create({
        data: {
            nama_lengkap: "admin1",
            asal_sekolah: "admin1",
            jurusan: "admin1",
            no_hp: "0812347890",
            alamat: "admin1",
            user: {
                connect: {
                    id: testUser.id,  // Gunakan id user yang valid
                }
            }
        },
    });
};



export const removeAllTextDaftarAdmin =  async () => {
    await prismaClient.daftar.deleteMany({
        where : {
            nama_lengkap : "admin1"
        }
    })
}


export const getTestDaftarAdmin = async () => {
    
    return await prismaClient.daftar.findFirst({
        where: {
          nama_lengkap: "admin1",
        },
    });
}

 






export const removeTestUserAdmin = async () => {
    await prismaClient.user.deleteMany({
        where : {
            username : "admin1"
        }
    })
}



