const mongoose = require("mongoose");

const Usersch = new mongoose.Schema({
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
});

const Country = mongoose.model('Signup', Usersch);

module.exports = Country;
