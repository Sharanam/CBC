const { model, Schema } = require("mongoose");

let linkSchema = new Schema(
  {
    route: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "routes",
    },
    bus: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "buses",
      unique: [
        true,
        "bus has already been assigned to some other or same route.",
      ],
    },
    schedule: [
      {
        type: Date,
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
