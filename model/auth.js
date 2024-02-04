const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


const Auth = new Schema({ 
    Username: { type: String, required: [true, "Please enter username!"], unique: [true, "Username already exists!"]},
    Password: { type: String, required: [true, "Please enter password!"]},
    UserType: { type: String, required: true},
});

Auth.plugin(uniqueValidator);

const authentication = mongoose.model("Auth", Auth);
module.exports = authentication;

