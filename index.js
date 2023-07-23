const express = require('express')
const app = express()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


// 

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.6wm6qxp.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const collegeCollection = client.db('nationalColleges').collection('college')
        const admissionCollegeCollection = client.db('nationalColleges').collection('admissionColleges')

        app.get('/colleges', async(req, res)=> {
            const result = await collegeCollection.find().toArray()
            res.send(result)
        })
        app.get('/colleges/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const result = await collegeCollection.findOne(query)
            res.send(result)
        })

        app.get('/admissionColleges', async(req, res )=> {
            const result = await admissionCollegeCollection.find().toArray()
            res.send(result)
        })
        app.get('/admissionColleges/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId (id)}
            const result = await admissionCollegeCollection.findOne(query)
            res.send(result)
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// 

app.get('/', (req, res) => {
    res.send('national college server is running')
})

app.listen(port, () => {
    console.log(`running on port ${port}`)
})