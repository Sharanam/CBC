const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let feedbackSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "user id is required."],
      ref: "users",
    },
    message: {
      type: String,
      required: [true, "message is required."],
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        required: [true, "user id is required."],
        ref: "users",
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        required: [true, "user id is required."],
        ref: "users",
      },
    ],
  },
  {
    timestamps: true,
    collection: "feedbacks",
  }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
