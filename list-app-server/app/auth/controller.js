const CustomError = require("../../utils/CustomError");
const { User, validateRegister, validateLogin } = require("../user/model");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { error } = validateRegister(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return next(new CustomError("Email already in use", 409));
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    return next(new CustomError("Internal server error", 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { error } = validateLogin(req.body);

    console.log(error);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new CustomError("Invalid email or password", 401));
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return next(new CustomError("Invalid email or password", 401));
    }

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "User login successfully" });
  } catch (err) {
    console.log(err);
    return next(new CustomError("Internal server error", 500));
  }
};

module.exports = { register, login };
