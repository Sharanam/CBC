const { model, Schema } = require("mongoose");

let contributionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "user id is required."],
      ref: "users",
    },
    // type: {
    //   type: Number,
    //   required: [true, "type is required."],
    //   enum: [0, 1],
    //   // 0: about current location
    //   // 1: about bus timings
    // },
    message: {
      type: String,
      trim: true,
      required: [true, "message is required."],
      enum: ["reached at", "hasn't reached at"],
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
  },
  {
    timestamps: true,
  }
);

module.exports = model("contributions", contributionSchema);
