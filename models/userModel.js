const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    picture: {
        type: String,
        default: 'xyz'
    }
});

module.exports = mongoose.model('User', userSchema);