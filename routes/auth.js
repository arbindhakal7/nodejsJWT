const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  //validate
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if user already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");
  // if (emailExist) return res.status(400).send("Email already exists");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create a new user
  const user = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  //Validate user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // if email already exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email does not exist");

  //check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Password");

  //create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});
module.exports = router;
