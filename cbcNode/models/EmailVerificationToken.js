const { model, Schema } = require("mongoose");

let tokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    token: {
      type: String,
      trim: true,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
      expires: 3600,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("tokens", tokenSchema);
