const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    collection: "links",
  }
);

module.exports = mongoose.model("Link", linkSchema);
