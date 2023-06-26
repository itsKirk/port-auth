const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash.toString();
};
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const user = await User.create({ email, password: hashedPassword, name });
  res.status(201).json({ success: true, user });
});

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ success: true });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/",
    failureFlash: true,
  })
);
router.get("/dashboard", async (req, res) => {
  const { session } = req;
  res.status(200).json({ message: "login successful" });
});
router.post("/getUser", function (req, res) {
  const { user } = req;
  if (!user) {
    res.status(403).json(null);
  }
  const loggedInUser = {
    id: user._id,
    name: user.name,
  };
  res.status(200).json({ user: loggedInUser });
});
module.exports = router;
