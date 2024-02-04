const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userPersonalAndCarModel = new Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    Age: { type: Number, required: true },
    authId: {
        type: mongoose.Types.ObjectId,
        ref: 'Auth',
        required: true,
        unique: ["This user already has been registered"]
    },
    appointmentId: {
        type: mongoose.Types.ObjectId,
        ref: 'appointment',
        required: false
    },
    testType: { type: String, required: true },
    testResult: { type: String, required: true },
    Comments: String,
    DOB: String,
    carDetails: {
        make: { type: String, required: true },
        model: { type: String, required: true },
        year: { type: Number, required: true },
        plateNumber: { type: String, required: true }
    }
});
userPersonalAndCarModel.plugin(uniqueValidator);
const User = mongoose.model("User", userPersonalAndCarModel);
module.exports = User;

