const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());

//mongodb link

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.SECURITY_KEY}@cluster0.ukuxru5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const productCollection = client.db('emajhon').collection('products');

        app.get('/products', async(req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            const count = await productCollection.estimatedDocumentCount();
            res.send({count, products});
        })
    }
    finally{

    }
}
run().catch(err => console.error(err))

app.get('/', (req, res) => {
    res.send('ema-jhon-server is running')
});

app.listen(port, () => {
    console.log(`emajhon running on port: ${port}`)
})