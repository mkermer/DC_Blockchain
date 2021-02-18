const express = require('Express');
const mongoose = require('mongoose');
const cors = require('cors');
const SHA256 = require('crypto-js/sha256');
let Block = require('./models/block.model');

const uri = process.env.ATLAS_URI;
mongoose.connect('mongodb+srv://DC:DC@cluster0.zwe64.mongodb.net/Blockchain?retryWrites=true&w=majority'
    , { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const app = express();
const port = process.env.PORT || 4000;

require('dotenv').config();

app.use(express.json());
app.use(cors());

const blockRouter = require('./routes/block');
const UserRouter = require('./routes/user');

app.use('/blocks', blockRouter);
app.use('/users', UserRouter);

// Create genesis block

const genesisBlock = async () => {

    const block = await Block.aggregate([{ $sort: { id: -1 } }, { $limit: 1 }])
    if (!block.length) {
        // Current timestamp

        // Create hash from message in transactions + timestamp + random nounce


        const firstBlock = {
            id: Number(0),
            hash: 'First',
            previousHash: 'null',
            nonce: Number(0),
            timestamp: Date.parse('2020-02-01T23:00:00.000Z'),
            transactions: ['The start...']
        }
        const newBlock = new Block(firstBlock)
        newBlock.save();
    }
}

genesisBlock()

// Receiving transactions data and sending data to variables

let transA = [];
let newTransA = {}
let transB = [];
let newTransB = {}

app.post("/blocks/update", async (req, res) => {
    console.log('############################### New transaction')

    const timestampNow = Date.now()
    const tHash = SHA256(req.body.toAddress + req.body.fromAdress + req.body.amount + timestampNow).toString();
    const newTrans = { ...req.body, hash: tHash, timestamp: timestampNow }
    console.log(newTrans)
    transA = [...transA, newTrans]

    res.status(200)
    res.json('Got data')

    console.log('###############################')
});

//Merkle tree - function that should receive an array


//Merkle tree for even number of elements
const merkleTreeHash = (a) => {
    console.log(a)
    let b = []
    if (a.length == 0) {
        console.log(SHA256('0').toString());
        return SHA256('0').toString();
    }
    else if (a.length == 1) {
        console.log(a[0])
        return a[0]
    }
    else if (a.length % 2 != 0) {
        for (let i = 0; i < a.length - 1; i += 2) {
            if (a.length - i > 3) {
                b.push(SHA256(a[i] + a[i + 1]).toString())
            } else {
                b.push(SHA256(a[i] + a[i + 1]).toString())
                b.push(SHA256(a[i + 2]).toString())
                console.log(b)
            }
        }
        return merkleTreeHash(b)
    }
    else if (a.length == 2) {
        console.log(a)
        console.log(b)
        console.log(SHA256(a[0] + a[1]).toString())
        b.push(SHA256(a[0] + a[1]).toString())
        return merkleTreeHash(b)
    } else {
        for (let i = 0; i < a.length; i += 2) {
            b.push(SHA256(a[i] + a[i + 1]).toString())
        }
        console.log(b)
        return merkleTreeHash(b)
    }
}


// Create block - search for previous blockto get lats block number
// Create hash, timestamp and merkle tree for new block
// when 10 min are over this data is compiled and sent for saving

// Loop that will send data to block 

setInterval(() => {
    console.log('---- START - setInterval ----')

    const transMerkleTree = merkleTreeHash(transA)
    console.log(transMerkleTree)
    transB = [...transA];
    transA = [];
    console.log('Switch in transactions is over')

    const myfunc = async () => {

        const currentTimestamp = new Date().getTime();
        console.log(currentTimestamp);

        const block = await Block.aggregate([{ $sort: { id: -1 } }, { $limit: 1 }])
        const maxBlockID = await (block[0].id + 1)
        console.log(maxBlockID)

        const nextBlock = {
            id: Number(maxBlockID),
            hash: 'test',
            previousHash: 'tes',
            nonce: Number(1),
            timestamp: currentTimestamp,
            transactions: transB
        }

        const newBlock = new Block(nextBlock);
        newBlock.save();
        console.log('---- END - setInterval ----')
    }

    myfunc()

}, 10000)


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
