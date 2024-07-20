const jwt = require("jsonwebtoken");
const config = require("../app/config");
const CustomError = require("../utils/CustomError");
const auth = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token)
    return next(new CustomError("Access denied. No token provided.", 401));

  try {
    const decoded = jwt.verify(token, config.secretkey);
    req.user = decoded;
    next();
  } catch (ex) {
    return next(new CustomError("Invalid token.", 400));
  }
};

module.exports = auth;
