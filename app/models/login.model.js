const mongoose = require('mongoose');

const LoginSchema = mongoose.Schema({
    eamil: { type: String },
    password: { type: String },
});

module.exports = mongoose.model('Login', LoginSchema);