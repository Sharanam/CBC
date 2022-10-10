const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let quickCommuteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "user id is required."],
      ref: "users",
    },
    history: [
      {
        path: {
          type: String,
          required: [true, "path is required."],
        },
        forThe: {
          type: String,
          enum: ["bus", "route"],
          required: [true, "type is required."],
        },
      },
    ],
    favourites: [
      {
        path: {
          type: String,
          required: [true, "path is required."],
        },
        forThe: {
          type: String,
          enum: ["bus", "route"],
          required: [true, "type is required."],
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: "quickCommutes",
  }
);

module.exports = mongoose.model("QuickCommute", quickCommuteSchema);
