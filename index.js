const express = require("express");
const app = express();
const path = require("path");
const PORT = 8000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Expsession = require("express-session");
const flash = require("connect-flash");

const { loginController, logoutController, signupController } = require("./controller/authController");
const { updateInformation, userInformation } = require("./controller/userController");
const { selectDate, createSlot, selectDateForTest } = require("./controller/appointmentControlller");

const { examinerInformation, displayTestStatus, sortExaminer, displayUser, modify_test } = require("./controller/examinerController");
const { fetchEjsInformation, fetchGTestInformation } = require("./controller/ejsController");

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());

mongoose.set('strictQuery', true);
mongoose.connect(
  "mongodb://localhost:27017/DriveTest",
  { useNewUrlParser: true }
);

app.use(
  Expsession({ secret: "mySecretKey", resave: true, saveUninitialized: true })
);

global.loggedIn = {};
app.use("*", (req, res, next) => {
  loggedIn.login = req.session.userId;
  loggedIn.UserType = req.session.UserType;
  next();
});

app.post("/login", loginController);
app.post("/signup", signupController);
app.get("/logout", logoutController);

app.post("/updateInformation", updateInformation);
app.post("/userInformation", userInformation);

app.get("/", fetchEjsInformation);

app.get("/examiner", examinerInformation);
app.get("/displayTestStatus", displayTestStatus);

app.post("/sortExaminer", sortExaminer);

app.post("/displayUser", displayUser);

app.post("/modify_test", modify_test);

app.get("/G2", async (req, res) => {
  res.render("G2");
});
app.get("/G", fetchGTestInformation);

app.get("/appointment", (req, res) => {
  res.render("appointment");
});

app.post("/selectDateForTest", selectDateForTest);
app.post("/selectDate", selectDate);
app.post("/createSlot", createSlot);

app.get("/login", (req, res) => {
  res.render("login", { errs: [] });
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
