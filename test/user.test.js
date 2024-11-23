import supertest from "supertest";
import { web } from "../src/app/web";
import { createTestUser, getTestUser, removeTestUser } from "./test-utils";
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

        });

        expect(response.status).toBe(201);
        expect(response.body.data.username).toBe('test');
        expect(response.body.data.name).toBe('test');
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
        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined()
        expect(result.body.data.token).not.toBe("test")
    })
})





describe('GET /users/profile', () => {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser()
    })


    it('should get', async () => {
        const result = await supertest(web).get('/users/profile').set('Authorization', 'test')
        expect(result.status).toBe(200)
        expect(result.body.data.email).toBe("test@gmail.com")
        expect(result.body.data.name).toBe("test")
    })
    
})



describe('DELETE /users/logout', () => {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser();
    })

    it('should can logout', async () => {
        const result = await supertest(web).delete("/users/logout").set('Authorization', "test")

        expect(result.status).toBe(200)
        expect(result.body.data).toBe("OK")



        const user = await getTestUser()
        expect(user.token).toBeNull()
    })
})