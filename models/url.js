const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortId: { type: String, required: true },
  redirecturl: { type: String, required: true },
  visitHistory: [
    {
      timestamps: { type: Date, default: Date.now },
    },
  ],
});

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;
