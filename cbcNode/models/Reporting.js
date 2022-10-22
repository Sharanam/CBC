const { model, Schema } = require("mongoose");

let reportingSchema = new Schema(
  {
    route: {
      type: Schema.Types.ObjectId,
      required: [true],
      ref: "routes",
    },
    serviceType: {
      type: Number,
      required: [true, "Type of service is required."],
      default: 0,
      enum: [0, 1, 2],
    },
    capacity: {
      type: Number,
      min: [20, "too few peeps"],
      required: [true, "maximum number of people is required."],
    },
    passengers: {
      type: Number,
      min: 0,
      required: [true, "number of passengers is required."],
    },
    time: {
      type: String,
      trim: true,
      required: [true, "The time to start the journey by the bus is required."],
    },
  },
  {
    timestamps: false,
  }
);

module.exports = model("reportings", reportingSchema);
