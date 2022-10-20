const { model, Schema } = require("mongoose");

let routeSchema = new Schema(
  {
    identifier: { type: String, trim: true, required: true, unique: true },
    stops: [{ type: String, trim: true, required: true }],
    schedule: [
      {
        type: String,
        trim: true,
        required: [
          true,
          "The time to start the journey by this bus has not been given.",
        ],
      },
    ],
    tripTime: {
      type: Number,
      required: [
        true,
        "In how many minutes the bus should finish the journey?",
      ],
    },
  },
  {
    timestamps: false,
  }
);

module.exports = model("routes", routeSchema);
