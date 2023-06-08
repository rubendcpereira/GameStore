const Game = require("../models/game");
const escapeRegExp = require("../utils/escapeRegExp");

exports.getGames = (req, res, next) => {
  Game.find(req.query.name ? { name: { $regex: new RegExp("^" + escapeRegExp(req.query.name), "i") } } : {})
    .sort({ name: "asc" })
    .then((games) => res.json(games))
    .catch((err) => next(err));
};
