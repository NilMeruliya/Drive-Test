const User = require("../model/user");
const mongoose = require("mongoose");

const fetchEjsInformation = (req, res) => {

    if (loggedIn.login && loggedIn.UserType === "Driver") {

      User.findOne({ authId: req.session.userId })
        .populate("authId")
        .populate("appointmentId")
        .exec((error, user) => {
          if (error) {
          }
          return res.render("index", { user });
        });
    }
    else{
        res.render('index');
    }
  };

  const fetchGTestInformation = async (req, res) => {

    const getuser = await User.find({
      authId: new mongoose.Types.ObjectId(req.session.userId),
    })
      .populate("authId")
      .populate("appointmentId");
    res.render("G", { user: getuser });
  };

  module.exports = {fetchEjsInformation, fetchGTestInformation};