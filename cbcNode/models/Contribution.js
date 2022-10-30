const { model, Schema } = require("mongoose");

let contributionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "user id is required."],
      ref: "users",
    },
    message: {
      type: String,
      trim: true,
      required: [true, "message is required."],
      enum: ["arrived", "not arrived"],
    },
    stop: { type: String, trim: true, required: true },
    bus: {
      type: Schema.Types.ObjectId,
      required: [true, "bus id is required."],
      ref: "buses",
    },
    route: {
      type: Schema.Types.ObjectId,
      required: [true, "route id is required."],
      ref: "routes",
    },
    createdAfter: {
      type: Date,
      required: [true, "time is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("contributions", contributionSchema);
