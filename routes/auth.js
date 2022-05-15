const router = require("express").Router();
const User = require("../models/User.js");

//Validation
const Joi = require("@hapi/joi");
const schema = Joi.object({
  fullname: Joi.string().min(7).required(),
  email: Joi.string().min(7).required().email(),
  password: Joi.string().min(5).required(),
});

router.post("/register", async (req, res) => {
  //validate
  const { error } = Joi.validate(req.body, schema);
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
