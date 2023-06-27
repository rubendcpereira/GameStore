const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const SECRET_KEY = "shh...";

exports.register = async (req, res, next) => {
  try {
    const { username, email, ...data } = req.body;

    // Checks if the unique user details are already in use
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      if (existingUser.username === username && existingUser.email === email) {
        return res.status(409).json({ message: "Username and Email Already Exist" });
      } else if (existingUser.username === username) {
        return res.status(409).json({ message: "Username Already Exists" });
      } else {
        return res.status(409).json({ message: "Email Already Exists" });
      }
    }

    // Registers user
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
    const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: "1d" });
    return res.json({ token: token, userId: user._id });
  } catch (err) {
    return next(err);
  }
};
