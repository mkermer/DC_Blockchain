const router = require('express').Router();
let User = require('../models/user.model');
let Block = require('../models/block.model');

router.route('/').get(async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        res.json('Error:' + err);
    }
})


router.route('/add').post(async (req, res) => {
    const publicKey = req.body.publicKey;
    const privateKey = req.body.privateKey;
    const balance = Number(req.body.balance);


    const newUser = new User({
        publicKey,
        privateKey,
        balance

    });

    try {
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.json('Error: ' + err);
    }
})

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getTransactions/:address').get(async (req, res) => {
    try {
        const publicAddress = req.params.address;
        const users = await User.find();

        let user = "";
        for (var i = 0; i < users.length; i++) {
            if (users[i].publicKey === publicAddress) {
                user = users[i];
            }
        }
        const publicKey = user.publicKey;

        const blocks = await Block.find();

        let transactions = [];

        // blocks.map(block => {
        //     if (block.transactions !== []) {
        //         block.transaction.map(transaction => {
        //             if (transaction.fromAddress === publicKey) {
        //                 transactions.push(transaction);
        //             }
        //         })
        //     }

        // })

        // const filteredTransaction = blocks.filter(block => {
        //     const filteredTrans = block.transactions.filter(transaction => {
        //         transaction.fromAddress === publicKey;

        //     })
        //     if (filteredTrans.length > 0) {
        //         res.json(filteredTrans);
        //     }
        // })

        for (let i = 0; i < blocks.length; i++) {
            const transaction = blocks[i].transactions;
            console.log(transaction.fromAdress);
            for (let j = 0; j < transaction.length; j++) {
                if (transaction[j].fromAdress === publicKey) {
                    transactions.push(transaction[j]);
                }
            }
        }

        res.json(transactions)


    } catch (err) {
        console.log(err);
    }
})
module.exports = router; 