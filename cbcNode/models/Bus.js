const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let busSchema = new Schema(
    {
        registrationNumber:{
            type:String,
            required:true
        },
        vehicleType:{
            type:String,
            required:false
        }
    }, {
    timestamps: false,
    collection: 'buses'
}
)

module.exports = mongoose.model("Bus", busSchema)
