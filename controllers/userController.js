const User = require("../models/user.model");

const createUser = async (req, res) => {
    const { body } = req;

    const user = new User(body);
    console.log(user);
    if (!user) {
        return res.status(400).json({ success: false });
    }

    user.setPrivateKey(body.privateKey);

    try {
        const jwt = user.generateJWT();
        console.warn('user jwt generated!');
        await user.save();

        console.warn('user saved!');

        return res.status(201).json({
            success: true,
            token: jwt,
            message: "Account created!",
            userData: {
                publicKey: user.publicKey,
                balance: user.balance,
                walletName: user.walletName
            },
        });
    } catch (error) {
        console.error(JSON.stringify(error))
        return res.status(400).json({
            error,
            message: "Account not created!",
        });
    }
};

module.exports = createUser;
