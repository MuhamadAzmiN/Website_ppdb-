import supertest from "supertest";
import { web } from "../src/app/web";
import { createTestUser, removeTestUser } from "./test-utils";
import { logger } from "../src/app/looging";


describe('POST /users/register', () => {
    afterEach(async () => {
        await removeTestUser();
    })

    it('should register a user', async () => {
        const response = await supertest(web).post('/users/register').send({
            username: 'test',
            email: 'test@gmail.com',
            password: 'test',
            name: 'test',
            asal_sekolah : "test",
            jurusan : "test",
            nik : 1
        });

        expect(response.status).toBe(201);
        expect(response.body.data.username).toBe('test');
        expect(response.body.data.name).toBe('test');
        expect(response.body.data.asal_sekolah).toBe('test');
        expect(response.body.data.jurusan).toBe('test');
        expect(response.body.data.password).toBeUndefined();
    });
})



describe('POST /users/login', () => {
    
    beforeEach(async () => {
        await createTestUser()
    })

    
    afterEach(async () => {
        await removeTestUser();
    })


    it('should login a user', async () => {
        const result = await supertest(web).post('/users/login').send({
            email : "test@gmail.com",
            password : "test"
        })


        console.log(result)

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined()
        expect(result.body.data.token).not.toBe("test")
    })
})