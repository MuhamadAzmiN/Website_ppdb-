import supertest from "supertest";
import { web } from "../src/app/web";
import { createTestDaftar, createTestUser, getTestDaftar, getTestUser, removeAllTextDaftar, removeTestUser } from "./test-utils";
import { logger } from "../src/app/looging";



describe('POST /users/daftar', () => {
    beforeEach(async () => {
        await createTestUser()
    })


    afterEach(async () => {
        
        await removeAllTextDaftar()
        await removeTestUser();
    })



    it('should daftar a user', async () => {    
        const result = await supertest(web).post('/users/daftar').set('Authorization', 'test').send({
            nama_lengkap : "test",
            asal_sekolah : "test",
            jurusan      : "test",
            no_hp        : "081234567890", // Diganti agar valid    
            alamat       : "test"
        });

        expect(result.status).toBe(201);
        expect(result.body.data.nama_lengkap).toBe("test");
        expect(result.body.data.asal_sekolah).toBe("test");
        expect(result.body.data.jurusan).toBe("test");
        expect(result.body.data.no_hp).toBe("081234567890");
        expect(result.body.data.alamat).toBe("test");


    })


    it('should daftar a user', async () => {    
        let result = await supertest(web).post('/users/daftar').set('Authorization', 'test').send({
            nama_lengkap : "test",
            asal_sekolah : "test",
            jurusan      : "test",
            no_hp        : "081234567890", // Diganti agar valid    
            alamat       : "test"
        });

        expect(result.status).toBe(201);
        expect(result.body.data.nama_lengkap).toBe("test");
        expect(result.body.data.asal_sekolah).toBe("test");
        expect(result.body.data.jurusan).toBe("test");
        expect(result.body.data.no_hp).toBe("081234567890");
        expect(result.body.data.alamat).toBe("test");


        result = await supertest(web).post('/users/daftar').set('Authorization', 'test').send({
            nama_lengkap : "test",
            asal_sekolah : "test",
            jurusan      : "test",
            no_hp        : "081234567890", // Diganti agar valid    
            alamat       : "test"
        })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()


    })


    it('should project request valid', async () => {
        const result = await supertest(web).post('/users/daftar').set('Authorization', 'test').send({
            nama_lengkap : "",
            asal_sekolah : "teast",
            jurusan      : "tesat",
            no_hp        : "081234567890", // Diganti agar valid    
            alamat       : "test"
        })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})




describe('GET /users/daftar', () => {
    beforeEach(async () => {
        await createTestUser()
        await createTestDaftar()
    })


    afterEach(async () => {
        await removeAllTextDaftar()
        await removeTestUser();
    })

    it('should get', async () => {
        const  testDaftar = await getTestDaftar()
        const result = await supertest(web).get('/users/daftar/' + testDaftar.nama_lengkap).set('Authorization', 'test')
        expect(result.status).toBe(200)

        expect(result.body.data.nama_lengkap).toBe(testDaftar.nama_lengkap)
        expect(result.body.data.asal_sekolah).toBe(testDaftar.asal_sekolah)
        expect(result.body.data.jurusan).toBe(testDaftar.jurusan)
        expect(result.body.data.no_hp).toBe(testDaftar.no_hp)
        expect(result.body.data.alamat).toBe(testDaftar.alamat)
    })
})