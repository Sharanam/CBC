const { model, Schema } = require("mongoose");

let announcementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    expireAt: {
      type: Date,
      required: true,
      default: function () {
        // 60 seconds from now
        return new Date().valueOf() + 60000;
      },
    },
  },
  {
    timestamps: true,
  }
);

announcementSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = model("announcements", announcementSchema);
