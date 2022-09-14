const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let announcementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "announcements",
  }
);

module.exports = mongoose.model("Announcement", announcementSchema);
