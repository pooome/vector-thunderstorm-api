const mongoose = require('mongoose');

//connect user schema with product model
const userSchema = mongoose.Schema({
    uid: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true }
});

 module.exports = mongoose.model('User', userSchema); 

 