const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let busSchema = new Schema({
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
    status: {
        type: String,
        required: [true, "status of bus is required."],
        enum: ["running", "under maintenance", "out of service", "running late"],
        default: "out of service",
        lowercase: true,
    },
    route: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "routes",
    },
}, {
    timestamps: false,
    collection: "buses",
});

module.exports = mongoose.model("Bus", busSchema);