const mongoose = require("mongoose")

const rashanSchema = mongoose.Schema(
    {
        // userID:{
        //     type: String,
        //     required: true
        // },
        name:
        {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        phoneNumber: {
            type: Number,
            unique: false,
            required: true
        },
        rashan: {
            type: String,
            unique: false,
            required: true
        },
        CNIC: {
            type: Number,
            unique: false,
            required: true
        },
        familyMembers: {
            type: Number,
            unique: false,
            required: true
        },
        income: {
            type: Number,
            unique: false,
            required: true
        },
        currentStatus: {
            type: String,
            required: true,
            default: "Pending"

        },
        date: {
            type: Date,
            default: Date.now
        },
    },
    { timestaps: true }
);






//models means collection
const RashanRequest = mongoose.model("RashanRequest", rashanSchema);

module.exports = RashanRequest;
