const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

const Appointment = new Schema({ 
    Date: {type: String, required: true},  
    Time: {type: String, required: true},
    isTimeSlotAvailable: {type: String}
});

Appointment.index({Date: 1, Time: 1}, {unique: [true, "Time slot already exist, please add new one."]});
Appointment.plugin(uniqueValidator);
module.exports = mongoose.model("appointment", Appointment);