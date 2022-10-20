const { model, Schema } = require("mongoose");

let quickCommuteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "user id is required."],
      ref: "users",
    },
    history: [
      {
        path: {
          type: String,
          required: [true, "path is required."],
        },
        forThe: {
          type: String,
          enum: ["bus", "route"],
          required: [true, "type is required."],
        },
      },
    ],
    favorites: [
      {
        path: {
          type: String,
          required: [true, "path is required."],
        },
        forThe: {
          type: String,
          enum: ["bus", "route"],
          required: [true, "type is required."],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("quickCommutes", quickCommuteSchema);
