const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { model, Schema } = mongoose;
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const config = require("../config");

const userSchema = Schema({
  username: {
    type: String,
    required: [true],
  },
  email: {
    type: String,
    unique: true,
    required: [true],
  },
  password: {
    type: String,
    required: [true],
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.secretkey, {
    expiresIn: "7d",
  });

  return token;
};

const User = mongoose.model("user", userSchema);

const validateRegister = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    email: Joi.string().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .messages({ "any.only": "{{#label}} does not match" }),
  });
  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { User, validateRegister, validateLogin };
