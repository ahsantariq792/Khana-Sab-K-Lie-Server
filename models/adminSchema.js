const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET || "ahsan12345678"

const admin = mongoose.Schema(
    {
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
        password: {
            type: String,
            required: true
        },
        
    },

);





//jwt token generate function
// adminSchema.methods.generateToken = async function () {
//     try {
//         var token = jwt.sign({
//             email: this.email,
//             _id: this._id,
//         }, SECRET);

//         //adding token in array in admin model
//         this.tokens = this.tokens.concat({ token: token })

//         //saving token in database
//         await this.save()
//         return token
//     }
//     catch (err) {
//         console.log(err)
//     }
// }


//models means collection
const Admin = mongoose.model("Admin", admin);

module.exports = Admin;
