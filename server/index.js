const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion,  } = require("mongodb");
const { verifyToken } = require("./middlewares/verifyToken");
const { verifyUserEmail } = require("./middlewares/verifyUserEmail");
const { verifyAdmin } = require("./middlewares/verifyAdmin");

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
        const database = client.db("tourTravel");
        const userCollections = database.collection("users");
        const packageCollections = database.collection("packages");

        // jwt token-------------------------
        app.post("/generate-token", async (req, res) => {
            const user = req.body;
            console.log("hitted ", user);

            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "365d",
            });
            console.log("user and token --> ", token);


            res.cookie("token", token, cookieOptions).send({ success: true, token });
        });

        app.get("/logout", (req, res) => {
            console.log("hitted logout")
          res
            .clearCookie("token", { ...cookieOptions, maxAge: 0 })
            .send({ success: true });
        });


        // packages related api----------------------------------------------
       app.post("/package", verifyToken, verifyUserEmail, verifyAdmin(userCollections), async (req, res) => {
  try {

    const packageData = req.body;

    console.log("Received package:", packageData);

    // Example DB insert
    const result = await packageCollections.insertOne(packageData);

    res.status(201).send({
      success: true,
      insertedId: result.insertedId
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});


        // users related api----------------------------------------------
        app.get("/users",verifyToken, async (req, res) => {
            const resutl = await userCollections.find().toArray()
            res.send(resutl);
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