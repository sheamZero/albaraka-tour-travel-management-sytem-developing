import express from "express";
import  { generateToken,logoutUser } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/jwt", generateToken);
authRouter.get("/logout", logoutUser)

export default authRouter;