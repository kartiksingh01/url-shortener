const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  long_url: { type: String, required: true },
  short_url: { type: String, unique: true },
  redirects: { type: Number, default: 0 },
});

module.exports = mongoose.model("URL", urlSchema);