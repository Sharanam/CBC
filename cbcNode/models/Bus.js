const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let busSchema = new Schema({
    registrationNumber: {
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
    status: {
        type: String,
        required: [true, "status of bus is required."],
        enum: ['running',
            'under maintenance',
            'out of service',
            'running late'
        ],
        default: 'out of service',
        lowercase: true
    },
    route: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "routes",
    }
}, {
    timestamps: false,
    collection: 'buses'
})

module.exports = mongoose.model("Bus", busSchema)