const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(express.json());

const uri = "mongodb+srv://tourTravel:mzyVEN9jmA4W7FLw@cluster0.yigerrh.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



app.get('/', (req, res) => {
    res.send('Hello World!');
});


async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const database = client.db("tourTravel");
        const userCollection = database.collection("users");


        app.post("/users", async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});