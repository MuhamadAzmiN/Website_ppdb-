import express from 'express';
import userController  from '../controller/userController.js';
const publicRouter = new express.Router();

// Rute untuk mengambil data pengguna
// publicRouter.get('/users', userController.get);
publicRouter.post('/users/register', userController.register);
publicRouter.post('/users/login', userController.login);



export {
    publicRouter
}
