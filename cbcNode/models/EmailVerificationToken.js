const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let tokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
      expires: 3600,
    },
  },
  {
    timestamps: true,
    collection: "tokens",
  }
);

module.exports = mongoose.model("Token", tokenSchema);
