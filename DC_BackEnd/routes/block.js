const router = require('express').Router();
let Block = require('../models/block.model');

router.route('/').get(async (req, res) => {
    try {
        const block = await Block.find();
        res.json(block);
    } catch (err) {
        res.json('Error:' + err);
    }
})


router.route('/add').post(async (req, res) => {
    const id = Number(req.body.id);
    const hash = req.body.hash;
    const previousHash = req.body.previousHash;
    const nonce = Number(req.body.nonce);
    const timestamp = Date.parse(req.body.timestamp);
    const transactions = Array(req.body.transactions)

    const newBlock = new Block({
        id,
        hash,
        previousHash,
        nonce,
        timestamp,
        transactions
    });

    try {
        const savedBlock = await newBlock.save();
        res.json(savedBlock);
    } catch (err) {
        res.json('Error: ' + err);
    }
})

router.route('/update/:id').post((req, res) => {
    Block.findById(req.params.id)
        .then(block => {
            block.id = req.body.id;
            block.hash = req.body.hash;
            block.previousHash = req.body.previousHash;
            block.nonce = req.body.nonce;
            block.timestamp = req.body.timestamp;
            block.transactions = req.body.transactions;


            block.save()
                .then(() => res.json(block))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router; 