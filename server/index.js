import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import route from "./routes/userRoute.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

app.use(route);