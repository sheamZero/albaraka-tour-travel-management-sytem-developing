import express from "express";
import  { createUser, googleLogin } from '../controllers/userController.js'
const route = express.Router();

route.post("/users", createUser);
route.post("/google",googleLogin);

export default route;