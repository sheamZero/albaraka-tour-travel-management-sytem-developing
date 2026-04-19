const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId, } = require("mongodb");
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
        const reviewCollections = database.collection("reviews");
        const bookingCollections = database.collection("bookings");


        app.post("/role", async (req, res) => {
            try {
                const { email } = req.body;  // ✅ সঠিক way: destructuring

                console.log("Received email:", email);

                const result = await userCollections.findOne({ email });

                console.log("Found user:", result);

                if (!result) {
                    return res.status(404).json({
                        success: false,
                        message: "User not found"
                    });
                }

                const userRole = {
                    role: result.role,
                    email: result.email
                };

                res.send(userRole);

            } catch (error) {
                console.error("Error in /role endpoint:", error);
                res.status(500).json({
                    success: false,
                    message: "Internal server error"
                });
            }
        });

        // jwt token-------------------------
        app.post("/generate-token", async (req, res) => {
            const user = req.body;
            // console.log("hitted ", user);

            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "365d",
            });
            // console.log("user and token --> ", token);


            res.cookie("token", token, cookieOptions).send({ success: true, token });
        });

        app.get("/logout", (req, res) => {
            // console.log("hitted logout")
            res
                .clearCookie("token", { ...cookieOptions, maxAge: 0 })
                .send({ success: true });
        });


        // packages related api----------------------------------------------
        app.get("/packages", async (req, res) => {
            try {
                const result = await packageCollections.find().toArray();
                res.send(result);
                console.log("packages", result)
            } catch (error) {
                res.status(500).send({ message: error.message });
            }

        })

        app.get("/packages/category", async (req, res) => {
            const category = req.query.cat?.toLowerCase();

            console.log("category from the api ", category)

            let query = {};
            if (category) {
                query.category = category;
            }

            const result = await packageCollections.find(query).toArray();
            res.send(result);
        });

        app.get("/categories-with-count", async (req, res) => {
            const result = await packageCollections.aggregate([
                {
                    $group: {
                        _id: "$category",
                        total: { $sum: 1 }
                    }
                }
            ]).toArray();

            res.send(result);
        });

        app.get("/package/:id", async (req, res) => {
            try {
                const { id } = req.params;

                const query = { _id: new ObjectId(id) }

                const result = await packageCollections.findOne(query);


                // console.log("id and result", id, result);

                res.send(result)

            } catch (error) {
                res.status(500).send({ message: error.message });
            }
        })


        app.post("/package", verifyToken, verifyUserEmail, verifyAdmin(userCollections), async (req, res) => {
            try {
                const packageData = req.body;

                // console.log("Received package:", packageData);

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



        // booking package related api ------------------
        app.get("/packages/my-bookings", verifyToken, verifyUserEmail, async (req, res) => {
            try {
                console.log("verifiedEmail:", req.verifiedEmail);

                const email = req.verifiedEmail;

                if (!email) {
                    return res.status(400).send({ message: "Email not found in request" });
                }

                const bookings = await bookingCollections
                    .find({ userEmail: email })
                    .sort({ bookingDate: -1 })
                    .toArray();

                res.send(bookings);
            } catch (error) {
                console.error("ERROR:", error); // 👈 VERY IMPORTANT
                res.status(500).send({ message: "Failed to fetch bookings" });
            }
        });

        app.post("/package/booking", verifyToken, verifyUserEmail, async (req, res) => {
            const bookedItem = req.body;
            console.log("booked item", bookedItem)

            if (bookedItem.numberOfPeople < 1 || bookedItem.numberOfPeople > 20) {
                return res.status(400).json({
                    success: false,
                    message: "Number of people must be between 1 and 20"
                });
            }

            const expectedTotalPrice = bookedItem.price * bookedItem.numberOfPeople;
            if (bookedItem.totalPrice !== expectedTotalPrice) {
                return res.status(400).json({
                    success: false,
                    message: "Price calculation mismatch"
                });
            }

            const packageExists = await packageCollections.findOne({
                _id: new ObjectId(bookedItem.packageId)
            });
            if (!packageExists) {
                return res.status(404).json({
                    success: false,
                    message: "Package not found"
                });
            }


            // const existingBooking = await db.collection('bookings').findOne({
            //     packageId: bookedItem.packageId,
            //     userEmail: bookedItem.userEmail,
            //     status: { $in: ['pending', 'confirmed'] }
            // });

            // if (existingBooking) {
            //     return res.status(409).json({
            //         success: false,
            //         message: "You already have an active booking for this package"
            //     });
            // }

            const bookingDocument = {
                ...bookedItem,
                status: 'pending', // pending, confirmed, cancelled, completed
                paymentStatus: 'unpaid', // unpaid, paid, refunded
            };

            const result = await bookingCollections.insertOne(bookingDocument);
            res.send(result)

        })

        // reviews related api----------------------------------------------
        app.get("/reviews/:packageId", async (req, res) => {
            try {
                const { packageId } = req.params;

                const query = { packageId: packageId };

                const result = await reviewCollections.find(query).toArray();

                console.log("pkg id:", query, result);

                res.send(result);
            } catch (error) {
                res.status(500).send({ message: error.message });
            }
        });


        // users related api----------------------------------------------
        app.get("/users", verifyToken, async (req, res) => {
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

        app.patch("/users/admin/:id",
            verifyToken,
            verifyUserEmail,
            verifyAdmin(userCollections),
            async (req, res) => {
                const id = req.params.id;

                console.log("iddddd ", id)

                const filter = { _id: new ObjectId(id) };
                const updateDoc = {
                    $set: { role: "admin" }
                };

                const result = await userCollections.updateOne(filter, updateDoc);

                res.send(result);
            });

        app.patch("/users/user/:id",
            verifyToken,
            verifyUserEmail,
            verifyAdmin(userCollections),
            async (req, res) => {
                const id = req.params.id;

                // console.log("iddddd ", id)

                const filter = { _id: new ObjectId(id) };
                const updateDoc = {
                    $set: { role: "user" }
                };

                const result = await userCollections.updateOne(filter, updateDoc);

                res.send(result);
            });

        app.delete("/users/:id",
            verifyToken,
            verifyUserEmail,
            verifyAdmin(userCollections),
            async (req, res) => {
                const id = req.params.id;

                console.log("user id ", id)
                const query = { _id: new ObjectId(id) };

                const userToDelete = await userCollections.findOne(query);

                if (!userToDelete) {
                    return res.status(404).json({
                        success: false,
                        message: "User not found"
                    });
                }

                // Prevent deleting admin accounts
                if (userToDelete.role === "admin") {
                    return res.status(403).json({
                        success: false,
                        message: "Cannot delete admin accounts"
                    });
                }
                const result = await userCollections.deleteOne(query);
                res.send(result);
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