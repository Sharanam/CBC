const { model, Schema } = require("mongoose");
const { isEmail, isMobilePhone } = require("validator");

let userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name is required"],
      validate: [
        (val) => val.match("^[A-Za-z1-9 ]+$"),
        "name must not contain any special characters.",
      ],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "email is invalid."],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "password is required"],
    },
    phone: {
      type: String,
      trim: true,
      required: [true, "phone number is required."],
      validate: [isMobilePhone, "phone number is invalid."],
    },
    type: {
      type: String,
      trim: true,
      enum: ["a", "c"], // a:'admin', c:'commuter'
      default: "c",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlacklisted: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    social: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    public: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("users", userSchema);
