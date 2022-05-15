const router = require("express").Router();
const User = require("../models/User.js");
const { registerValidation } = require("../validation");

router.post("/register", async (req, res) => {
  //validate
  if (error) return res.status(400).send(error.details[0].message);
  const user = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    date: req.body.date,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
