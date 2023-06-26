const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const SECRET_KEY = "shh...";

exports.register = async (req, res, next) => {
  try {
    const user = new User(req.body);
    user.password = bcrypt.hashSync(req.body.password, 12);
    await user.save();

    return res.status(201).json({ message: "User Registered" });
  } catch (err) {
    return next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    // Validation
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    } else if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    // Response
    const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ token: token, userId: user._id });
  } catch (err) {
    return next(err);
  }
};
