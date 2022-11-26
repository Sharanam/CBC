const { model, Schema } = require("mongoose");

let linkSchema = new Schema(
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
      unique: [
        true,
        "bus has already been assigned to some other or same route.",
      ],
    },
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
  },
  {
    timestamps: false,
  }
);

module.exports = model("links", linkSchema);
