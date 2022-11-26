const { model, Schema } = require("mongoose");

let reportingSchema = new Schema(
  {
    route: {
      type: Schema.Types.ObjectId,
      required: [true, "route is required"],
      ref: "routes",
    },
    bus: {
      type: Schema.Types.ObjectId,
      required: [true, "bus is required"],
      ref: "buses",
    },
    passengers: [
      {
        from: {
          type: String,
          trim: true,
          required: [true, "from is required"],
        },
        to: {
          type: String,
          trim: true,
          required: [true, "to is required"],
        },
        count: {
          type: Number,
          required: [true, "count is required"],
          default: 0,
          min: [0, "count must be greater than or equal to 0"],
        },
      },
    ],
    schedule: {
      type: String,
      trim: true,
      required: [true, "The time to start the journey by the bus is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("reportings", reportingSchema);
