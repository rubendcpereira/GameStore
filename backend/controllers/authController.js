const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = "shh...";

exports.register = async (req, res, next) => {
  try {
    const user = new User(req.body);
    user.password = bcrypt.hashSync(req.body.password, 12);
    await user.save();

    return res.sendStatus(201); // Created
  } catch (err) {
    return next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });

    // Validation
    if (!user) {
      return res.sendStatus(404); // Not Found
    } else if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.sendStatus(400); // Bad Request
    }

    // Response
    const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ token: token, userId: user._id });
  } catch (err) {
    return next(err);
  }
};
