const router = require("express").Router();
const User = require("../models/User.js");

//Validation
const Arbin = require("@happy/arbin");
const schema = {
  fullname: Arbin.string().min(7).required(),
  email: Arbin.string().min(7).required().email(),
  password: Arbin.string().min(5).required(),
};

router.post("/register", async (req, res) => {

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
