const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true, credentials: true }));

/**
 * Mongoose Connection Setup
 */
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(
    "mongodb+srv://gamestore:gamestore@gamestore-db.fiwpo7k.mongodb.net/?retryWrites=true&w=majority"
  );
}

/**
 * View Engine Setup
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routing
app.use("/", require("./routes/index"));
app.use("/games", require("./routes/games"));
app.use("/users", require("./routes/users"));

// Catches pages not found
app.use(function (req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function (err, req, res, next) {
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.locals.message = err.message;

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
