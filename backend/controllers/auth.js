const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const user = require("../models/user");
//internal imports

//methods
exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, newUser) => {
    if (err) {
      return res.status(400).json({ error: "Could not create an account" });
    }
    newUser.salt = undefined;
    newUser.hashed_password = undefined;
    res.json(newUser);
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  //first we try to find a user in the database that has this email adress sent from the frontend
  User.findOne({ email }, (err, foundUser) => {
    if (err || !foundUser) {
      return res
        .status(400)
        .json({ error: "Email was not found in the database" });
    }
    if (foundUser.authenticate(password)) {
      return res.status(401).json({ error: "Password and Email do not match" });
    }
    //at this point i know the user has the right credentials so i have to store them
    const token = jwt.sign({ _id: foundUser._id }, process.env.JWT_SECRET);
    res.cookie("tk", token, { expire: new Date() + 9999 });
    const { _id, name, email } = foundUser;
    return res.json({ token, user: { _id, name, email } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("tk");
  res.json({ message: "Success" });
};
