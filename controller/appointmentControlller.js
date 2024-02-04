const validator = require("../middleware/validation_error");
const appointment = require("../model/appointment");

const selectDate = (req, res) => {

  appointment.find({ Date: req.body.Date }, (error, slots) => {
    if (error) {
      validator(req, error);
      return res.render("appointment", { errs: req.flash("validationErrors") });
    }

    const new_slots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
    const old_slots = slots.map((sl) => sl.Time);
    const available = new_slots.filter((x) => !old_slots.includes(x));

    if (available.length == 0) {
      return res.render("appointment", {
        errs: ["Sorry, no available slots for this date"],
      });
    }
    res.render("appointment", { available, Date: req.body.Date });
  });
};

const createSlot = (req, res, next) => {

  const data = {
    Date: req.body.Date,
    Time: req.body.Time,
    isTimeSlotAvailable: true,
  };

  appointment.create(data, (error, sucess) => {
    if (error) {
      validator(req, error);
    return  res.render("appointment", { errs: req.flash("validationErrors") });
    }

    res.render("appointment", {
      success: [
        "please select the date to add another slot",
      ],
    });
  });
};

const selectDateForTest = (req, res) => {

  appointment.find(
    { Date: req.body.Date, isTimeSlotAvailable: true },
    (error, slots) => {

      if (error) {
        validator(req, error);
        return res.render(req.body.testType, { errs: req.flash("validationErrors") });
      }
      const available = slots.map((sl) => sl.Time);

      if (available.length == 0) {
        return res.render(req.body.testType, {
          errs: ["Sorry, no slot available"],
        });
      }
      res.render(req.body.testType, { available, Date: req.body.Date });
    }
  );
};

module.exports = { selectDate, createSlot, selectDateForTest };
