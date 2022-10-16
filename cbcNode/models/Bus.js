const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let busSchema = new Schema(
  {
    registrationNumber: {
      type: String,
      unique: true,
      required: [true, "Registration number is required."],
      lowercase: true,
    },
    serviceType: {
      type: Number,
      required: [true, "Type of service is required."],
      default: 0,
      enum: [0, 1, 2],
    },
    capacity: {
      type: Number,
      min: [20, 'too few peeps'],
      required: [true, 'maximum number of people is required.']
    },
    status: {
      type: String,
      required: [true, "status of bus is required."],
      enum: [
        "running on time",
        "running late",
        "under maintenance",
        "cancelled",
      ],
      default: "under maintenance",
      lowercase: true,
    },
  },
  {
    timestamps: false,
    collection: "buses",
  }
);

module.exports = mongoose.model("Bus", busSchema);
