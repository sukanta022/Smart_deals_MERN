const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

//middlewear 
app.use(cors())
app.use(express.json())

// smartDealDbUser
// Gwi2a7p8Ynv1SVf4
const uri = "mongodb+srv://smartDealDbUser:Gwi2a7p8Ynv1SVf4@cluster0.2q9t7lj.mongodb.net/?appName=Cluster0";

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

    //see all products
    app.get('/products', async(req,res) => {
      const cursor = productsCollection.find()
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