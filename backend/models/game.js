const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Game", "DLC", "Subscription"],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  trailer: {
    type: String,
    required: true,
    match: /(https|http|ftp):\/\/[\w-]+(\.[\w-]+)*([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/, // https://stackoverflow.com/a/8218223
  },
  platform: {
    type: [{
        type: String,
        enum: ["Windows", "macOS", "Linux"],
    }],
    required: true,
  },
});

module.exports = mongoose.model("Game", GameSchema);
