const validator = require("../middleware/validation_error");
const User = require("../model/user");

const examinerInformation = (req, res) => {

  User.find({ testResult: "Waiting" })
    .populate("appointmentId")
    .exec((error, users) => {
      if (error) {
        validator(req, error)
       return res.render("examiner", { errs: req.flash("validationErrors") });
      }
      res.render("examiner", { users });
    });
};

const displayTestStatus = (req, res) => {

  User.find({ testResult: { $ne: "Waiting" } })
    .populate("appointmentId")
    .exec((error, users) => {
      if (error) {
        validator(req, error);
      return  res.render("adminList", { errs: req.flash("validationErrors") });
      }

      res.render("adminList", { users });
    });
};

const sortExaminer = (req, res) => {

  if (req.body.testType === "All") {
    return res.redirect("/examiner");
  }

  User.find({ testResult: "Waiting", testType: req.body.testType })
    .populate("appointmentId")
    .exec((error, users) => {
      if (error) {
        validator(req, error);
      return  res.render("login", { errs: req.flash("validationErrors") });
      }

      res.render("examiner", { users, typeTest: req.body.testType });
    });
};

const displayUser = (req, res) => {

  User.findById(req.body.id)
    .populate("appointmentId")
    .exec((error, user) => {

   return res.render("viewExaminer", { user });
    });
};

const modify_test = (req, res) => {

  console.log("update status", req.body);
  User.findByIdAndUpdate(
    req.body.id,
    { testResult: req.body.testResult, Comments: req.body.Comments },
    (error, updatedUser) => {
      if (error) {
        return console.log("modify_test", error);
      }

      return res.redirect("/examiner");
    }
  );
};

module.exports = { examinerInformation, displayTestStatus, sortExaminer, displayUser, modify_test };
