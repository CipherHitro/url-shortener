const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      require: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      require: true,
    },
    visitHistory: {
      type: [{ timestamp: { type: Number } }],
    },
    createdBy :{
      type : mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const URL = mongoose.model("url", urlSchema);
module.exports = URL;
