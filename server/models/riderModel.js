const mongoose = require("mongoose");
const { Schema } = mongoose;

const RiderSchema = new Schema({
    Id: {
        type: Number,
        required: true, // Set to true if Id is required
        default: null, // Specify a default value if needed
    },
    Name: String,
    Email: String,
    Position: String,
    NRIC: String,
    Status: Boolean,
    Image: String,
    cloudinary_id: String
})

module.exports = mongoose.model("Riders", RiderSchema)