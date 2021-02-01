const express = require('Express');
const mongoose = require('mongoose');
const cors = require('cors');
const SHA256 = require('crypto-js/sha256');
let Block = require('./models/block.model');

const app = express();
const port = process.env.PORT || 4000;

require('dotenv').config();

app.use(express.json());
app.use(cors());

const blockRouter = require('./routes/block');
const UserRouter = require('./routes/user');

app.use('/blocks', blockRouter);
app.use('/users', UserRouter);

// Function initialize server
// Create genesis block
/* let lastBlockID = 0;

const
let lastBloack = Block.aggregate([{ $sort: { id: -1 } }, { $limit: 1 }]) 
        .then((block) => { console.log(block) }) */




// Receiving transactions data and sending data to variables

let transA = [];
let newTransA = {}
let transB = [];
let newTransB = {}

app.post("/blocks/update/:id", async (req, res) => {



    console.log("#### /update/:id, ");
    console.log(req.body)

    transA.push(req.body.transaction)


    const timestampNow = Date.now()
    const tHash = SHA256(req.body.transaction.toAddress + req.body.transaction.fromAdress + req.body.transaction.amount + timestampNow).toString();
    const newTrans = { ...req.body.transaction, hash: tHash, timestamp: timestampNow }
    console.log('###############################')
    console.log(newTrans)
    console.log('###############################')
    newTransA.push(newTrans)
});

// Create block - search for previous blockto get lats block number
// Create hash, timestamp and merkle tree for new block
// when 10 min are over this data is compiled and sent for saving



// Loop that will send data to block 

setInterval(() => {

    transB = [...transA];
    console.log(transA)
    console.log(transB)
    transA = [];
    console.log(transA)

    console.log('---- setInterval ----')



    /* Block.find({ id: 4 })   */
    /* Block.find({ id: 4 }).find().sort({ age: -1 }).limit(1) */
    /* Block.aggregate([{ $sort: { id: -1 } }, { $limit: 1 }]) 
            .then((block) => { console.log(block) })
     */
    /*     Block.findById(req.params.id)
            .then(block => {
                block.id = req.body.id;
                block.hash = req.body.hash;
                block.previousHash = req.body.previousHash;
                block.nonce = req.body.nonce;
                block.timestamp = req.body.timestamp;
                block.transactions = req.body.transactions;
    
                block.save()
                    .then(() => res.json(block))
                    .then(() => console.group(block))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err)); */

}, 10000)

//

const uri = process.env.ATLAS_URI;
mongoose.connect('mongodb+srv://DC:DC@cluster0.zwe64.mongodb.net/Blockchain?retryWrites=true&w=majority'
    , { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
