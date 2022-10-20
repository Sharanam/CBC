const { model, Schema } = require("mongoose");

let passSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "user id is required."],
      ref: "users",
    },
    from: { type: String, required: [true, "from which stop?"] },
    to: { type: String, required: [true, "to which stop?"] },
    date: { type: Date, required: [true, "starting from which date?"] },
    validity: {
      type: Number,
      required: [true, "for How many months?"],
      default: 1,
      min: 1,
      max: 12,
    },
    price: {
      type: Number,
      required: [true, "final price is required"],
      default: 1,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("passes", passSchema);
