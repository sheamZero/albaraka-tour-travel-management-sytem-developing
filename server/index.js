import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import route from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    "http://localhost:5173",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const uri = "mongodb+srv://tourTravel:mzyVEN9jmA4W7FLw@cluster0.yigerrh.mongodb.net/tourTravel";

// connect database
mongoose.connect(uri)
.then(() => {
    console.log("Connected to MongoDB");

    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });

})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// create user in database
app.use(route);
app.use(route);
// generate token
app.use(authRouter)