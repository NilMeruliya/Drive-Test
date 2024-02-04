const User = require("../model/user");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const validator = require("../middleware/validation_error");
const appointment = require("../model/appointment");


const userInformation = (req, res) => {

  const data = req.body;
  console.log("userid, userInformation", req.session.userId);
  console.log("save method", data);

  const formatedData = {
    fname: data.fname,
    licenseNumber: data.licenseNumber,
    lname: data.lname,
    Age: data.Age,
    DOB: data.DOB,
    testType: data.testType,
    testResult: "Waiting",
    carDetails: {
      make: data.make,
      model: data.model,
      year: data.year,
      plateNumber: data.plateNumber,
    },
  };

  appointment.findOneAndUpdate(
    { Date: req.body.Date, Time: req.body.Time },
    { isTimeSlotAvailable: false },
    { new: true },
    (error, appoint) => {

      if (error) {
        validator(req, error);
        return res.render(data.testType, { errs: req.flash("validationErrors") });
      }
      formatedData.appointmentId = appoint._id;

      bcrypt.hash(formatedData.licenseNumber, 10, (error, hash) => {

        formatedData.licenseNumber = hash;
        formatedData.authId = new mongoose.Types.ObjectId(req.session.userId)

        User.create(formatedData, (error, sucess) => {
          if (error) {
            validator(req, error);
            return res.render(data.testType, { errs: req.flash("validationErrors") });
          }
          res.redirect("/");
        });
      });
    }
  );
};

const updateInformation = (req, res) => {

  const data = req.body;
  const carDetails = {
    make: data.make,
    model: data.model,
    year: data.year,
    plateNumber: data.plateNumber,
  };
  console.log(data, req.session.userId);

  User.findOneAndUpdate(
    { authId: req.session.userId },
    { carDetails },
    { new: true },
    (error, user) => {
      res.redirect("/");
    }
  );
};

module.exports = { userInformation, updateInformation };
