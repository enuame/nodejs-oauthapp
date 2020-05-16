// This is what gets logged to MONGODB

// Load Values
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


//Database Schema - What is captured for the MONGODB

var userSchema = mongoose.Schema({

    local: {
        email: String,
        password: String
    },
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    mixer: {
        id: Number,
        token: String,
        username: String
    },
    role: {
        type: String,
        enum: ['user', 'alpha', 'beta', 'sub', 'partner', 'vip', 'administrator'],
        default: 'user'
    }
});

// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);