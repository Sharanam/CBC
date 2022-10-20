const { model, Schema } = require("mongoose");

let routeSchema = new Schema(
  {
    identifier: { type: String, required: true, unique: true },
    stops: [{ type: String, required: true }],
    schedule: [
      {
        type: String,
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
