const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET || "ahsan12345678"

const userSchema = mongoose.Schema(
    {
        userName:
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
        password: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true
                }
            }
        ],
    },
    { timestaps: true }
);

//this function should be above creating model
//when password is modified then if is run

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next();
})


//jwt token generate function
userSchema.methods.generateToken = async function () {
    try {
        var token = jwt.sign({
            email: this.email,
            _id: this._id,
        }, SECRET);

        //adding token in array in user model
        this.tokens = this.tokens.concat({ token: token })

        //saving token in database
        await this.save()
        return token
    }
    catch (err) {
        console.log(err)
    }
}


//models means collection
const User = mongoose.model("User", userSchema);

module.exports = User;
