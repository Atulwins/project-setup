import userController from '../controller/userController';
import middleware from '../middleware/userMiddleware';
import express from 'express';
export const route = express.Router();

const controller = new userController();
const auth = new middleware();
// //create user
route.post("/user/create",auth.auth, controller.newUser);

// //delete
route.delete('/delete/:id', controller.deleteUser);

// // //get all data
route.get('/alluser', controller.allUser);

//user update
route.patch("/update/:id", controller.updateUserData);
// login
route.post("/user/login", controller.login);

