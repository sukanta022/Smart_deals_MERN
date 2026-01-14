const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

const admin = require("firebase-admin");

const serviceAccount = require("./smartdeals-48a28-firebase-adminsdk-fbsvc-aa19370bb1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


//middlewear 
app.use(cors())
app.use(express.json())

const logger = (req, res, next) => {
  console.log("logging information")
  next();
}

const verifyFireBaseToken = async(req, res, next) => {
  console.log("In the verify middleware", req.headers.authorization)
  if(!req.headers.authorization){
    //do not allow to go
    return res.status(401).send({message : 'Unauthorized access'})
  }
  const token = req.headers.authorization.split(' ')[1];
  if(!token){
    return res.status(401).send({message : 'Unauthorized access'})
  }
  //verify token
  try{
    const user = await admin.auth().verifyIdToken(token)
    req.token_email = user.email
    console.log(user)
    next();
  }
  catch{
    console.log("Invalid token")
    return res.status(401).send({message : 'Unauthorized access'})
  }
  
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2q9t7lj.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', (req,res) => {
    res.send("Smart server is running")
})

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db('smart_db')
    const productsCollection = db.collection('products')
    const bidsCollection = db.collection('bids')
    const usersCollection = db.collection('users')

    //user api
    app.post('/users', async(req, res) => {
      const newUser = req.body

      const newUserEmail = req.body.email
      const query = {email : newUserEmail}
      const isUserExist = await usersCollection.findOne(query)

      if(isUserExist){
        res.send({'message' : 'User already exist. Do not need to insert again'})
      }
      else{
        const result = await usersCollection.insertOne(newUser)
        res.send(result)
      }
      
    })


    //Product API
    // _________________________________________________________ //
    //see all products
    app.get('/products', async(req,res) => {
      console.log(req.query)
      const email = req.query.email

      //filter the data with based on email in url
      const query = {}

      if(email){
        query.email = email     
      }

      const cursor = productsCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })

    //to see specific product
    app.get('/products/:id', async(req,res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await productsCollection.findOne(query)
      res.send(result)
    })

    //create new product
    app.post('/products', async(req,res) => {
      const newProduct = req.body;
      const result = await productsCollection.insertOne(newProduct)
      res.send(result)
    })

    //delete product
    app.delete('/products/:id', async(req,res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await productsCollection.deleteOne(query)
      res.send(query)
    })

    //update product
    app.patch('/products/:id', async(req,res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const updateProduct = req.body
      const update = {
        $set: {
          name : updateProduct.name,
          price : updateProduct.price
        }
      }
      const result = await productsCollection.updateOne(query, update)
      res.send(result)
    })

    app.get('/latest-products', async(req,res) => {
      const cursor = productsCollection.find().sort({created_at : -1}).limit(6)
      const result = await cursor.toArray()
      res.send(result)
    })

    //all bids api 
    app.get('/bids', logger, verifyFireBaseToken, async(req,res) => {
      // console.log("headers", req.headers)
      const email = req.query.email
      const query = {}
      if(email){
        if(email !== req.token_email){
          return res.status(403).send({message : "Forbidden access"})
        }
        query.buyer_email = email
      }
      const cursor = bidsCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/bids/:id', async(req,res) => {
      const bidID = req.params.id
      const query = { _id: new ObjectId(bidID) }
      const result = await bidsCollection.findOne(query)
      res.send(result)
    })

    app.delete('/bids/:id', async(req,res) => {
      const bidID = req.params.id
      const query = { _id: new ObjectId(bidID) }
      const result = await bidsCollection.deleteOne(query)
      res.send(result)
    })

    //add new bids
    app.post('/bids', async(req,res) => {
      const newBid = req.body
      const result = await bidsCollection.insertOne(newBid)
      res.send(result)
    })

    app.get('/products/bids/:productID', verifyFireBaseToken, async(req,res) => {
      const productID = req.params.productID
      const query = { product : productID}
      const cursor = bidsCollection.find(query).sort({bid_price : -1})
      const result = await cursor.toArray()
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})