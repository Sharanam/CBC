const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let routeSchema = new Schema(
    {
        number:{
            type:Number,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        stops:[
            {type: }
        ]
    }, {
    timestamps: true,
    collection: 'routes'
}
)

module.exports = mongoose.model("Route", routeSchema)
