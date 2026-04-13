import express from 'express'
import { getAdminStatus } from '../controllers/adminController.js';

const adminRoute = express.Router();

adminRoute.get("/admin/:email", getAdminStatus);

export default adminRoute;