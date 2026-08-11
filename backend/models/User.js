const mongoose = require ('mongoose');
const validator = require ('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,  
        required: true,
        validate: {
            validator : function(value){
                return validator.isEmail(value);
            }
        }
    },
    password: {
        type : String,
        required: true
    } 
});

const User = mongoose.model('User', userSchema);
module.exports = User;