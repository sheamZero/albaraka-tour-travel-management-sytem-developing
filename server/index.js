const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 9000;
const app = express();

const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
    optionSuccessStatus: 200,
};

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const uri =
    "mongodb+srv://tourTravel:yHX3Fp8jyt2gZiRe@cluster0.yigerrh.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const userCollections = client.db("tourTravel").collection("users");

        // users related api----------------------------------------------
        app.get("/users", async (req, res) => {
            const resutl = await userCollections.find().toArray()
            res.send(resutl)
        })

        app.post("/users/create", async (req, res) => {
            try {
                const userData = req.body;
                if (!userData?.email) {
                    return res.status(400).send({
                        success: false,
                        message: "Email is required"
                    });
                }

                const existingUser = await userCollections.findOne({
                    email: userData.email
                });

                if (existingUser) {
                    return res.send({
                        success: true,
                        message: "User already exists",
                        inserted: false
                    });
                }

                const result = await userCollections.insertOne(userData);

                res.send({
                    success: true,
                    message: "User created successfully",
                    inserted: true,
                    data: result
                });

            } catch (error) {
                res.status(500).send({
                    success: false,
                    message: error.message
                });
            }
        });

        app.post("/users/google", async (req, res) => {
            try {
                const userData = req.body;
                if (!userData?.email) {
                    return res.status(400).send({
                        success: false,
                        message: "Email is required"
                    });
                }

                const existingUser = await userCollections.findOne({
                    email: userData.email
                });

                if (existingUser) {
                    return res.send({
                        success: true,
                        message: "User already exists",
                        user: existingUser,
                        inserted: false
                    });
                }

                // create new user
                const result = await userCollections.insertOne(userData);

                res.send({
                    success: true,
                    inserted: true,
                    message: "Google user created successfully",
                    data: result
                });
            } catch (error) {
                res.status(500).send({
                    success: false,
                    message: error.message
                });

            }
        });


        // api for isAdmin hooks-----------------------------
        app.get("/users/admin/:email", async (req, res) => {
            const email = req.params.email;
            // console.log('clicked ', email)
            if (!email) {
                return res.status(400).send({ message: "Email required" });
            }
            try {
                const user = await userCollections.findOne({ email: email });

                const isAdmin = user?.role === "admin";

                res.send({ isAdmin });
            } catch (error) {
                res.status(500).send({ message: error.message });
            }
        });



        app.get("/", (req, res) => {
            res.send("Hello from Tour Travel Server");
        });



    } catch (error) {
        console.log(error);
    }
}

run();


// listen server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});