const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let linkSchema = new Schema(
  {
    route: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "routes",
    },
    bus: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "buses",
    },
    schedule: [
      {
        start: {
          type: Date,
          required: [
            true,
            "The time to start the journey by this bus has not been given.",
          ],
        },
      },
    ],
  },
  {
    timestamps: false,
    collection: "linkes",
  }
);

module.exports = mongoose.model("Link", linkSchema);
