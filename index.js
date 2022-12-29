const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kmh2g.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {

    try {
        const postsCollection = client.db('posts').collection('post')


        app.post('/post', async (req, res) => {
            const post = req.body;
            const result = await postsCollection.insertOne(post);
            res.send(result)


        })
    }
    finally {



    }

}

run().catch(err => console.log(err))






app.get('/', (req, res) => {
    res.send('bismillahir rohmanir rohim')

})


app.listen(port, () => {
    console.log('server port', port)
})