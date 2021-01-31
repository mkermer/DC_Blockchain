const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    publicKey: { type: String },
    privateKey: { type: String },
    balance: { type: Number },

})


const User = mongoose.model('User', UserSchema);

module.exports = User; 