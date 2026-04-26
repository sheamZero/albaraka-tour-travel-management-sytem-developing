const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId, } = require("mongodb");
const SSLCommerzPayment = require('sslcommerz-lts')

const { verifyToken } = require("./middlewares/verifyToken");
const { verifyUserEmail } = require("./middlewares/verifyUserEmail");
const { verifyAdmin } = require("./middlewares/verifyAdmin");
const nodemailer = require("nodemailer");

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
app.use(express.urlencoded({ extended: true }));

const sendEmail = async (emailAddress, emailData) => {
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    transporter.verify(function (error, success) {
        if (error) {
            console.log("error inside verify", error);
        } else {
            console.log("Server is ready to take our message!");
        }
    });

    const mailBody = {
        from: `"Albaraka" <${process.env.SMTP_USER}>`, // sender address
        to: emailAddress,
        subject: emailData.subject,
        html: emailData.message,
    };

    transporter.sendMail(mailBody, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email send: " + info.response);
        }
    });

};


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yigerrh.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});


// sslcommerz
const store_id = process.env.SSLCZ_STORE_ID
const store_passwd = process.env.SSLCZ_STORE_PASSWORD
const is_live = false //true for live, false for sandbox

console.log(store_id, store_passwd)


async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        const database = client.db("tourTravel");
        const userCollections = database.collection("users");
        const packageCollections = database.collection("packages");
        const reviewCollections = database.collection("reviews");
        const bookingCollections = database.collection("bookings");
        const paymentCollections = database.collection("payments");



        // payments related apis------------------
        //sslcommerz init
        app.post('/create-sslcz-payment',
            verifyToken,
            verifyUserEmail,
            async (req, res) => {
                try {
                    const { bookingId } = req.body;

                    if (!bookingId) {
                        return res.status(400).send({ error: "Booking ID is required" });
                    }

                    const booking = await bookingCollections.findOne({
                        _id: new ObjectId(bookingId),
                    });

                    if (!booking) {
                        return res.status(404).send({ error: "Booking not found" });
                    }

                    if (booking.paymentStatus === "paid") {
                        return res.status(400).send({ error: "Already paid" });
                    }

                    // if (booking.status !== "pending") {
                    //     return res.status(400).send({ error: "Invalid booking status" });
                    // }

                    const amount = Number(booking.totalPrice);
                    if (!amount || amount <= 0) {
                        return res.status(400).send({ error: "Invalid amount" });
                    }

                    const transaction_id = `${booking._id}-${Date.now()}`;

                    const data = {
                        total_amount: amount,
                        currency: "BDT",
                        tran_id: transaction_id,

                        success_url: `${process.env.BASE_URL}/payment-success`,
                        fail_url: `${process.env.BASE_URL}/payment-fail`,
                        cancel_url: `${process.env.BASE_URL}/payment-cancel`,
                        ipn_url: `${process.env.BASE_URL}/ipn`,

                        shipping_method: "NO",
                        product_name: booking.title,
                        product_category: booking.category,
                        product_profile: "general",

                        cus_name: booking.userName || "Customer",
                        cus_email: booking.userEmail || "test@email.com",
                        cus_add1: "Dhaka",
                        cus_city: "Dhaka",
                        cus_country: "Bangladesh",
                        cus_phone: booking.phone || "01700000000",

                        ship_name: booking.userName || "Customer",
                        ship_add1: "Dhaka",
                        ship_city: "Dhaka",
                        ship_country: "Bangladesh",
                    };

                    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

                    const apiResponse = await sslcz.init(data);

                    if (!apiResponse?.GatewayPageURL) {
                        return res.status(500).send({ error: "Failed to get gateway URL" });
                    }

                    // insert inital payments with pending status
                    const result = await paymentCollections.insertOne({
                        bookingId: booking._id,
                        title: booking.title,
                        tran_id: transaction_id,
                        userName: booking.userName,
                        userEmail: booking.userEmail,
                        amount,
                        status: "pending",
                        createdAt: new Date(),
                    });

                    console.log(result);

                    res.send({ url: apiResponse.GatewayPageURL, result });

                } catch (err) {
                    console.log(err.message)
                    res.send(err.message)
                }

            }
        )

        app.post("/payment-success", async (req, res) => {
            try {
                const successData = req.body;
                const { tran_id, val_id } = successData;

                console.log("SUCCESS CALLBACK:", successData);

                if (!tran_id || !val_id) {
                    return res.status(400).send("Missing data");
                }

                const payment = await paymentCollections.findOne({ tran_id });

                if (!payment) {
                    return res.status(404).send("Payment not found");
                }

                // prevent double processing
                if (payment.status === "paid") {
                    return res.redirect(`${process.env.CLIENT_URL}/payment-success`);
                }

                // 🔐 VALIDATION STEP (IMPORTANT)
                const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
                const validation = await sslcz.validate({ val_id });

                console.log("validation steps -->", validation);

                if (validation.status !== "VALID") {
                    await paymentCollections.updateOne(
                        { tran_id },
                        { $set: { status: "invalid", updatedAt: new Date() } }
                    );

                    return res.status(400).send("Payment validation failed");
                }

                // update payment
                await paymentCollections.updateOne(
                    { tran_id },
                    {
                        $set: {
                            status: "paid",
                            paidAt: new Date(),
                            amount: successData.amount,
                            store_amount: successData.store_amount,
                            currency: successData.currency,
                            card_brand: successData.card_brand,
                            card_issuer: successData.card_issuer,
                            card_issuer_country: successData.card_issuer_country,
                        },
                    }
                );

                // update booking
                await bookingCollections.updateOne(
                    { _id: new ObjectId(payment.bookingId) },
                    {
                        $set: {
                            paymentStatus: "paid",
                            status: "approved",
                            paidAt: new Date(),
                        },
                    }
                );


                const booking = await bookingCollections.findOne({
                    _id: new ObjectId(payment.bookingId),
                });

                // Send payment success email 
                const emailData = {
                    subject: `Payment Successful - ${booking.title}`,
                    message: `
                    <div style="font-family: Arial; line-height:1.6; color:#333;">

                    <h2 style="color:green;">✅ Payment Successful</h2>

                    <p>Hi <strong>${booking.userName}</strong>,</p>

                    <p>Your payment has been successfully completed. Your booking is now <strong>confirmed</strong>.</p>

                    <hr/>

                    <h3>📦 Booking Details</h3>
                    <p><strong>Package:</strong> ${booking.title}</p>
                    <p><strong>Location:</strong> ${booking.location}</p>
                    <p><strong>Travel Date:</strong> ${booking.startDate} → ${booking.endDate}</p>

                    <h3>💳 Payment Info</h3>
                    <p><strong>Transaction ID:</strong> ${tran_id}</p>
                    <p><strong>Validation ID:</strong> ${val_id}</p>
                    <p><strong>Amount Paid:</strong> ${successData.amount} ${successData.currency}</p>
                    <p><strong>Payment Method:</strong> ${successData.card_type}</p>
                    <p><strong>Card Issuer:</strong> ${successData.card_issuer}</p>
                    <p><strong>Date:</strong> ${successData.tran_date}</p>

                    <hr/>

                    <p>Keep this email for your records.</p>

                    <br/>

                    <p>Best regards,<br/>
                    <strong>Albaraka Travel Team</strong></p>

                    </div>
                    `,
                };

                sendEmail(booking.userEmail, emailData)
                    .then(() => console.log("Email sent"))
                    .catch((err) => console.error("Email error:", err));

                return res.redirect(`${process.env.CLIENT_URL}/payment-success`);

            } catch (err) {
                console.error(err);
                res.status(500).send("Server error");
            }
        });

        app.post("/payment-fail", async (req, res) => {
            try {
                const { tran_id } = req.body;

                if (tran_id) {
                    await paymentCollections.updateOne(
                        { tran_id },
                        {
                            $set: {
                                status: "failed",
                                failedAt: new Date(),
                            },
                        }
                    );
                }

                res.redirect(`${process.env.CLIENT_URL}/payment-failed`);

            } catch (err) {
                console.error(err);
                res.status(500).send("Fail handler error");
            }
        });

        app.post("/payment-cancel", async (req, res) => {
            try {
                const { tran_id } = req.body;

                if (tran_id) {
                    await paymentCollections.updateOne(
                        { tran_id },
                        {
                            $set: {
                                status: "canceled",
                                canceledAt: new Date(),
                            },
                        }
                    );
                }

                res.redirect(`${process.env.CLIENT_URL}/payment-cancel`);

            } catch (err) {
                console.error(err);
                res.status(500).send("Cancel handler error");
            }
        });


        app.get("/my-payments", verifyToken, verifyUserEmail, async (req, res) => {
            try {
                const email = req.verifiedEmail;

                if (!email) {
                    return res.status(400).json({
                        success: false,
                        message: "Email is required"
                    });
                }

                const payments = await paymentCollections.find({ userEmail: email }).toArray();

                if (!payments || payments.length === 0) {
                    return res.status(200).json({
                        success: true,
                        message: "No payments found",
                        data: []
                    });
                }

                res.status(200).json({
                    success: true,
                    message: "Payments retrieved successfully",
                    data: payments
                });

            } catch (error) {
                console.error("Error fetching payments:", error);
                res.status(500).json({
                    success: false,
                    message: "Internal server error"
                });
            }
        });


        app.post("/role", async (req, res) => {
            try {
                const { email } = req.body;

                console.log("Received email:", email);

                const result = await userCollections.findOne({ email });

                // console.log("Found user:", result);

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
        // app.get("/packages", async (req, res) => {
        //     try {
        //         const result = await packageCollections.find().toArray();
        //         res.send(result);
        //         console.log("packages", result)
        //     } catch (error) {
        //         res.status(500).send({ message: error.message });
        //     }
        // })

        // paginationss
        app.get("/packages", async (req, res) => {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 6;

                const skip = (page - 1) * limit;

                const totalPackages = await packageCollections.countDocuments();

                const packages = await packageCollections
                    .find()
                    .sort({ _id: -1 })
                    .skip(skip)
                    .limit(limit)
                    .toArray();

                res.send({
                    totalPackages,
                    page,
                    totalPages: Math.ceil(totalPackages / limit),
                    data: packages,
                });
            } catch (error) {
                res.status(500).send({ message: "Pagination failed" });
            }
        });

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

        // apis for admin
        // all bookings
        app.get("/bookings",
            verifyToken,
            verifyUserEmail,
            verifyAdmin(userCollections),
            async (req, res) => {
                try {
                    const bookings = await bookingCollections
                        .find()
                        .sort({ createdAt: -1 })
                        .toArray();

                    res.send({
                        data: bookings,
                    });
                } catch (error) {
                    res.status(500).send({ message: "Failed to fetch bookings" });
                }
            }
        );

        app.patch(
            "/bookings/status/:id",
            verifyToken,
            verifyUserEmail,
            verifyAdmin(userCollections),
            async (req, res) => {
                try {
                    const id = req.params.id;
                    const { status } = req.body; // approved / rejected

                    console.log("id and status", id, status);

                    const query = { _id: new ObjectId(id) };

                    const updateDoc = {
                        $set: {
                            status,
                        },
                    };

                    const result = await bookingCollections.updateOne(query, updateDoc);

                    res.send({
                        success: true,
                        modifiedCount: result.modifiedCount,
                    });
                } catch (error) {
                    res.status(500).send({
                        success: false,
                        message: "Failed to update status",
                    });
                }
            }
        );

        // delete 
        app.delete("/bookings/:id",
            verifyToken,
            verifyUserEmail,
            verifyAdmin(userCollections),
            async (req, res) => {
                try {
                    const id = req.params.id;

                    console.log("dlt id", id)

                    const result = await bookingCollections.deleteOne({
                        _id: new ObjectId(id),
                    });

                    if (result.deletedCount === 0) {
                        return res.status(404).send({
                            success: false,
                            message: "Booking not found",
                        });
                    }

                    res.send({
                        success: true,
                        deletedCount: result.deletedCount,
                        message: "Booking deleted successfully",
                    });
                } catch (error) {
                    res.status(500).send({
                        success: false,
                        message: "Failed to delete booking",
                    });
                }
            }
        );

        // apis for user
        //specific user bookings
        app.get("/packages/my-bookings",
            verifyToken,
            verifyUserEmail,
            async (req, res) => {
                try {
                    // console.log("verifiedEmail:", req.verifiedEmail);

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
            }
        );

        // add booking
        app.post("/package/booking", verifyToken, verifyUserEmail, async (req, res) => {
            const bookedItem = req.body;
            const email = req.verifiedEmail;
            // console.log("booked item", bookedItem, email)

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

            const bookingDocument = {
                ...bookedItem,
                status: 'pending', // pending, confirmed, cancelled, completed
                paymentStatus: 'unpaid', // unpaid, paid, refunded
            };

            const result = await bookingCollections.insertOne(bookingDocument);

            // sending email
            const emailData = {
                subject: `Booking Received - ${bookedItem.title}`,
                message: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      
      <h2 style="color: #2c3e50;">Booking Confirmed (Pending Payment)</h2>

      <p>Hi <strong>${bookedItem.userName}</strong>,</p>

      <p>Thank you for booking with <strong>Albaraka Travel</strong>. Your booking request has been successfully received.</p>

      <hr/>

      <h3>📦 Package Details</h3>
      <p><strong>Package:</strong> ${bookedItem.title}</p>
      <p><strong>Location:</strong> ${bookedItem.location}</p>
      <p><strong>Category:</strong> ${bookedItem.category}</p>

      <h3>📅 Travel Dates</h3>
                <p><strong>Start:</strong> ${bookedItem.startDate}</p>
                <p><strong>End:</strong> ${bookedItem.endDate}</p>

                <h3>👥 Travelers</h3>
                <p><strong>Number of People:</strong> ${bookedItem.numberOfPeople}</p>

                <h3>💰 Payment Summary</h3>
                <p><strong>Price per person:</strong> $${bookedItem.price}</p>
                <p><strong>Total Price:</strong> $${bookedItem.totalPrice}</p>
                <p style="color: orange;"><strong>Status:</strong> Pending Payment</p>

                <hr/>

                <p>Please complete your payment to confirm this booking.</p>

                <p style="margin-top: 20px;">
                  <strong>Next Step:</strong><br/>
                  Go to your dashboard and complete payment to secure your spot.
                </p>

                <br/>

                <p>Best regards,<br/>
                <strong>Albaraka Travel Team</strong></p>

                 </div>
                `,
            };

            await sendEmail(email, emailData);

            res.send({
                emailSend: true,
                result
            })

        })




        // reviews related api----------------------------------------------
        app.get("/reviews/:packageId", async (req, res) => {
            try {
                const { packageId } = req.params;

                const query = { packageId: packageId };

                const result = await reviewCollections.find(query).toArray();

                // console.log("pkg id:", query, result);

                res.send(result);
            } catch (error) {
                res.status(500).send({ message: error.message });
            }
        });

        // specific user review
        app.get(
            "/my-reviews",
            verifyToken,
            verifyUserEmail,
            async (req, res) => {
                try {
                    const email = req.verifiedEmail;

                    console.log("hitted:", email);

                    if (!email) {
                        return res.status(400).send({
                            success: false,
                            message: "Email not found from token",
                        });
                    }

                    // 1️⃣ Find user first
                    const user = await userCollections.findOne({ email });

                    console.log("user", user)

                    if (!user) {
                        return res.status(404).send({
                            success: false,
                            message: "User not found",
                        });
                    }

                    // assuming reviews store userId
                    const query = { userId: user._id.toString() };

                    // 2️⃣ Find reviews by userId
                    const reviews = await reviewCollections
                        .find(query)
                        .sort({ createdAt: -1 })
                        .toArray();

                    console.log("reviews:", reviews);

                    return res.status(200).send(reviews);
                } catch (error) {
                    console.error("Error fetching reviews:", error);

                    return res.status(500).send({
                        success: false,
                        message: "Failed to fetch reviews",
                        error: error.message,
                    });
                }
            }
        );

        // add review
        app.post("/review",
            verifyToken,
            async (req, res) => {
                try {
                    const { bookingId, packageId, rating, review, title, location } = req.body;
                    const email = req.user.email;
                    const user = await userCollections.findOne({ email });

                    if (!user) {
                        return res.status(404).send({ message: "User not found" });
                    }

                    const reviewData = {
                        userName: user.name,
                        userImage: user.photoURL,
                        userId: user._id.toString(),
                        bookingId,
                        packageId,
                        title,
                        location,
                        rating,
                        review,
                        date: new Date().toISOString(),
                    };
                    // console.log("users ", reviewData)
                    const result = await reviewCollections.insertOne(reviewData);

                    res.send({
                        success: true,
                        insertedId: result.insertedId,
                    });
                } catch (error) {
                    res.status(500).send({ message: error.message });
                }
            }
        );





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


        // user statistics
        app.get(
            "/userStatistics",
            verifyToken,
            verifyUserEmail,
            async (req, res) => {
                try {
                    const userEmail = req.verifiedEmail;

                    const bookings = await bookingCollections
                        .find({ userEmail })
                        .toArray();

                    // -------------------------
                    // 1. STATS
                    // -------------------------
                    const total = bookings.length;

                    const completed = bookings.filter(
                        (b) => b.status === "completed"
                    ).length;

                    const pending = bookings.filter(
                        (b) => b.status === "pending"
                    ).length;

                    const totalPay = bookings.reduce((sum, b) => {
                        return sum + Number(b.totalPrice || 0);
                    }, 0);

                    const stats = {
                        total,
                        completed,
                        pending,
                        totalPay,
                    };

                    // -------------------------
                    // 2. CHART DATA
                    // -------------------------
                    const monthlyData = {};

                    for (const booking of bookings) {
                        const date = new Date(booking.bookingDate);
                        const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

                        if (!monthlyData[key]) {
                            monthlyData[key] = {
                                month: key,
                                completed: 0,
                                pending: 0,
                                confirmed: 0,
                            };
                        }

                        if (monthlyData[key][booking.status] !== undefined) {
                            monthlyData[key][booking.status]++;
                        }
                    }

                    const bookingTrendData = Object.values(monthlyData);

                    // -------------------------
                    // 3. RECENT BOOKINGS (FIX ADDED)
                    // -------------------------
                    const recentBookings = bookings
                        .slice(-4) // last 5 bookings
                        .reverse() // newest first
                        .map((b, index) => ({
                            id: b._id || index,
                            title: b.title || "Unknown Trip",
                            status: b.status,
                        }));

                    console.log("recent bookings ", recentBookings)
                    // -------------------------
                    // RESPONSE
                    // -------------------------
                    res.send({
                        stats,
                        bookingTrendData,
                        recentBookings,
                    });
                } catch (error) {
                    res.status(500).send({ error: error.message });
                }
            }
        );

app.get("/admin-statistics", async (req, res) => {
  try {
    const users = await userCollections.find().toArray();
    const packages = await packageCollections.find().toArray();
    const bookings = await bookingCollections.find().toArray();
    const reviews = await reviewCollections.find().toArray();
    const payments = await paymentCollections.find().toArray();

    // -------------------------
    // BOOKING STATS (optimized)
    // -------------------------
    const bookingStats = {
      total: bookings.length,
      pending: 0,
      completed: 0,
      rejected: 0,
    };

    for (const b of bookings) {
      if (b.status === "pending") bookingStats.pending++;
      else if (b.status === "completed") bookingStats.completed++;
      else if (b.status === "rejected") bookingStats.rejected++;
    }

    // -------------------------
    // USER STATS
    // -------------------------
    const userStats = {
      total: users.length,
      admins: 0,
      users: 0,
    };

    for (const u of users) {
      if (u.role === "admin") userStats.admins++;
      else userStats.users++;
    }

    // -------------------------
    // REVENUE
    // -------------------------
    let totalRevenue = 0;

    for (const p of payments) {
      totalRevenue += Number(p.amount) || 0;
    }

    // -------------------------
    // SAFE UTC DATE FORMATTER
    // -------------------------
    const getUTCDate = (date) => {
      const d = new Date(date);
      return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
    };

    // -------------------------
    // BOOKING TREND MAP (FAST O(n))
    // -------------------------
    const bookingMap = {};

    for (const b of bookings) {
      const dateSource = b.createdAt || b.bookingDate;
      if (!dateSource) continue;

      const key = getUTCDate(dateSource);
      bookingMap[key] = (bookingMap[key] || 0) + 1;
    }

    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setUTCDate(d.getUTCDate() - (6 - i));

      const formatted = getUTCDate(d);

      return {
        date: formatted,
        bookings: bookingMap[formatted] || 0,
      };
    });

    // -------------------------
    // RESPONSE
    // -------------------------
    res.send({
      success: true,
      data: {
        users: userStats,
        bookings: bookingStats,
        packages: packages.length,
        reviews: reviews.length,
        revenue: totalRevenue,
        bookingTrend: last7Days,
      },
    });

  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).send({
      success: false,
      message: "Failed to fetch admin statistics",
    });
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