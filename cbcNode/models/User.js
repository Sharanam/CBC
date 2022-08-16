const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true
        },
        personal:{
            dob:{
                type:String,
                required:false
            },
            gender:{
                type:String,
                required:false
            }
        }
    }, {
    timestamps: true,
    collection: 'users'
}
)

module.exports = mongoose.model("User", userSchema)
