const { model, Schema } = require("mongoose");

let commentSchema = new Schema(
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
    replies: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "comments",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("comments", commentSchema);
