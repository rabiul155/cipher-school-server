const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i4cqwjk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {

        const usersCollection = client.db("cipher-schools").collection("users")


        app.get('/users', async (req, res) => {
            const query = {}
            const result = await usersCollection.find(query).toArray();
            res.send(result)

        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        app.get('/user', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const result = await usersCollection.findOne(query)
            res.send(result)

        })

        app.put('/userAbout', async (req, res) => {
            const email = req.query.email;
            const userAbout = req.body;

            const filter = { email: email }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    about: userAbout.about
                }
            }
            const result = await usersCollection.updateOne(filter, updatedDoc, options);
            res.send(result);

        })

        app.put('/userDetails', async (req, res) => {
            const email = req.query.email;
            const userDetails = req.body;
            console.log(userDetails);
            const filter = { email: email }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    education: userDetails.education,
                    institute: userDetails.institute
                }
            }
            const result = await usersCollection.updateOne(filter, updatedDoc, options)
            res.send(result);

        })
        app.put('/updateWebsites', async (req, res) => {
            const email = req.query.email;
            const websites = req.body;
            console.log(websites);

            const filter = { email: email }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    linkedIn: websites.linkedIn,
                    gitHub: websites.gitHub,
                    facebook: websites.facebook,
                    twitter: websites.twitter,
                    instagram: websites.instagram,
                    website: websites.website
                }
            }
            const result = await usersCollection.updateOne(filter, updatedDoc, options)
            res.send(result);

        })






    }



    finally {


    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Server start')
})

app.listen(port, () => {
    console.log(`server runnig on port ${port}`);
})