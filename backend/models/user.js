const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const like = {
  like: { type: Boolean, required: true },
  gameId: { type: Schema.ObjectId, ref: "Game", required: true },
};

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    match: /^[a-z0-9]+$/i,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
  },
  likes: {
    type: [like],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
