const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
       
    username:{
        type: String,
    },
    email:{
        type: String,
    },
    password:{
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
})


module.exports = User = mongoose.model('users', UserSchema);