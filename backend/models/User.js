const mongoose = require ('mongoose');
const validator = require ('validator')
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
    } 
});

const User = mongoose.model('User', userSchema);
module.exports = User;