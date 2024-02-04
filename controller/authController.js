const bcrypt = require("bcrypt");
const Auth = require("../model/auth");
const validate = require("../middleware/validation_error");

const loginController = (req, res) => {
  const { Username, Password } = req.body;
  if (!Username && !Password) {
    return res.render("login", {
      errs: ["Please enter username and password!"],
    });
  }

  Auth.findOne({ Username: Username }, (error, user) => {

    if (user) {
      bcrypt.compare(Password, user.Password, (error, same) => {

        if (same) {
          req.session.userId = user._id;
          req.session.UserType = user.UserType;
        return  res.redirect("/");
        } else {
       return res.render("login", { errs: ['Password is not correct, please enter correct password.']});
        }
      });
    } else {
    return res.render("login", { errs: ['Invalid user information.']})
    }
  });
};

const signupController = (req, res) => {

  const body = req.body;
  const user = {
    Username: body.Username,
    Password: body.Password,
    UserType: body.UserType,
  };

  if (!user.Username && !user.Password) {
    return res.render("login", {
      errs: ["Please enter username and password"],
    });
  }

  if (!user.Username) {
    return res.render("login", {
      errs: ["Please enter username"],
    });
  }

  if (!user.Password) {
    return res.render("login", {
      errs: ["Please enter password"],
    });
  }

  if (body.Password !== body.confirmPassword) {
   return res.render("login", {
      errs: ["both the password are not matching."],
    });
  }

  bcrypt.hash(user.Password, 10, (error, hash) => {
    if (error) {
      validate(req, error);
    return res.render("login", { errs: req.flash("validationErrors") });
    }
    user.Password = hash;   
      
  Auth.create(user, (error, sucess) => {
    if (error) {
      validate(req, error);
     return res.render("login", { errs: req.flash("validationErrors") });
    } else {
      res.render("login", {
        success: ["registered successfully."],
      });
    }
  });
  });
};

const logoutController = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};

module.exports = { loginController, logoutController, signupController };
