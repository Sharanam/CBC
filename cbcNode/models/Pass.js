const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let passSchema = new Schema({
    // from postman
    commuter: {
        type: Schema.Types.ObjectId,
        required: [true, 'Commuter Id is required.'],
        ref: "users",
    }
}, {
    timestamps: false,
    collection: 'passes'
})

module.exports = mongoose.model("Pass", passSchema)