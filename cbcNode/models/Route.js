const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let routeSchema = new Schema(
  {
    identifier: { type: String },
    stops: [{ type: String }],
  },
  {
    timestamps: false,
    collection: "routes",
  }
);

module.exports = mongoose.model("Route", routeSchema);
