const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let contributionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "user id is required."],
      ref: "users",
    },
    type: {
      type: Number,
      required: [true, "type is required."],
      enum: [0, 1],
      // 0: about current location
      // 1: about bus timimgs
    },
    message: {
      type: String,
      required: [true, "message is required."],
      enum: ["bus reached at", "hasnt reached"],
    },
    stop: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "contributions",
  }
);

module.exports = mongoose.model("Contribution", contributionSchema);
