const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
  try {
    const user = new User(req.body);
    user.password = bcrypt.hashSync(req.body.password, 12);
    await user.save();

    return res.sendStatus(201);
  } catch (err) {
    return next(err);
  }
};

exports.login = (req, res, next) => {
  // TODO
};

exports.logout = (req, res, next) => {
  // TODO
};
