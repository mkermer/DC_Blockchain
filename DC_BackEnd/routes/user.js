const router = require('express').Router();
let User = require('../models/user.model');

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


module.exports = router; 