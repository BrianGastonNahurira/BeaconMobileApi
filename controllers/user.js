// const router = require("express").Router();
const { Users } = require("../models/model");

// the brain for registering a new user(student)
const register_user = async (req, res) => {
  const email_check = await Users.findOne({
    email: { $eq: req.body.email },
  });
  if (email_check) {
    res.send({ data: "email exists", status: false });
  } else {
    const user = new Users({
      full_name: req.body.full_name,
      phone_number: req.body.phone_number,
      email: req.body.email,
      password: req.body.password,
      confirm_password: req.body.password,
    });
    try {
      const save_added_user = await user.save();
      res.send({
        status: true,
        data: "user registered Successfully",
        result: save_added_user,
      });
    } catch (error) {
      res.send({ status: false, data: "An Error Occured", result: error });
    }
  }
};

//brain for loging in a user
const user_login = async (req, res) => {
  try {
    const current_user = await Users.find({
      $and: [{ password: req.body.password }, { email: req.body.email }],
    });
    if (current_user) {
      res.send({ user: current_user, status: true });
    } else {
      res.send({ status: false, data: "No matching details" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

module.exports = { register_user, user_login };
