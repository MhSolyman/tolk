const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kmh2g.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {

    try {
        const postsCollection = client.db('posts').collection('post')
        const ouserCullection = client.db('ousers').collection('ouser')
        const likeCullection = client.db('likes').collection('like')
        const commentCullection = client.db('comments').collection('comment')


        app.post('/post', async (req, res) => {
            const post = req.body;
            const result = await postsCollection.insertOne(post);
            res.send(result)


        });
        app.get('/tpost',async (req, res) => {
            const query = {};
            const result = await postsCollection.find(query).limit(3).toArray();
            res.send(result)
        })
        app.get('/post', async (req, res) => {
            const query = {};
            const result = await postsCollection.find(query).toArray();
            res.send(result)
        });

        app.get('/post/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await postsCollection.findOne(query);
            res.send(result)
        })


        app.post('/users', async (req, res) => {
            const user = req.body;
            const email = user.email
            const query = { email: email }
            const find = await ouserCullection.findOne(query);
            console.log(find)
            if (find === null) {
                const dataInsert = await ouserCullection.insertOne(user);
                res.send(dataInsert)

            }
        })

        




        app.get('/about/:email', async (req, res) => {
            const email = req.params.email;

            const query = { email }
            const result = await ouserCullection.findOne(query)
            res.send(result)

        })


        app.post('/like/', async (req, res) => {
            const id = req.query.id;
            const email = req.query.email
           
          
            const updatedDoc = {
               
                    like: 'like',
                    postId: id,
                    email:email
               
            }
            const result = await likeCullection.insertOne(updatedDoc)
            res.send(result)

        })



        app.get('/likes',async(req,res)=>{
            const query = {};
            const result = await likeCullection.find(query).toArray();

            console.log(result.length)
            
            
            res.send(result)
            
           
     
        })


        app.post('/comment', async (req, res) => {
            const user = req.body;
            const result = await commentCullection.insertOne(user)
            res.send(result)
        })

        // app.get('/like',async(req,res)=>{
        //  const query = {};
        //    const result = await postsCollection.find(query).toArray();
        //result.map(results=>)
        //res.send(result)

        // })



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