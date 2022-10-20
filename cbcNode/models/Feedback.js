const { model, Schema } = require("mongoose");

let feedbackSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "user id is required."],
      ref: "users",
    },
    message: {
      type: String,
      trim: true,
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
  }
);

module.exports = model("feedbacks", feedbackSchema);
