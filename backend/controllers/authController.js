const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = "secretKey";

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

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });

    // Validation
    if (!user) {
      return res.sendStatus(404);
    } else if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.sendStatus(400);
    }

    // Response
    const token = jwt.sign({ _id: user._id }, SECRET_KEY);
    const { password, ...data } = user.toJSON();
    res.cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000 /* 1 day */ }).send(data);
  } catch (err) {
    return next(err);
  }
};
