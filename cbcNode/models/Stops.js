const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let stopSchema = new Schema({
    name: {
        type: String,
        required: [true, "registration number is required."],
        lowercase: true,
        unique: true,
    },
    vehicleType: {
        type: Number,
        required: [true, "type of bus is required."],
        default: 0,
        enum: [0, 1, 2]
    },
    to: [{
        stop: {
            type: Schema.Types.ObjectId,
            required: [true, 'destination stop id is required'],
            ref: "stops",
        },
        price: {
            type: Number,
            required: [true, 'price is required.']
        },
        distance: {
            type: Number,
            required: false
        }
    }],
}, {
    timestamps: false,
    collection: 'stops'
})

module.exports = mongoose.model("Stop", stopSchema)