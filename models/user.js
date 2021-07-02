const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create a user schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!']
    },
    address: {
        type: String,
        required: [true, 'Address is required!']
    },
    contact: {
        type: String,
        required: [true, 'Contact is required!']
    },
    user_name: {
        type: String,
        required: [true, 'User Name is required!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!']
    }
});


//create a user model
const User = mongoose.model('user', UserSchema);

//export user model
module.exports = User;