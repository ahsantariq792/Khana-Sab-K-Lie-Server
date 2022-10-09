const express = require("express");
const router = express.Router();
const User = require("../models/userSchema")
const RashanRequest = require("../models/rashanSchema")
const bcrypt = require("bcryptjs")
const Authenticate = require("../middleware/Authenticate");


router.route("/").get(async (req, res) => {
    res.send("Hello world Router")
})


//Signup Route
router.route('/signup').post((req, res) => {
    console.log("api hit")
    //destructuring so we dont need write req.body everytime
    const { userName, email, phoneNumber, password, } = req.body
    console.log(userName)
    //validation
    if (!userName, !email, !phoneNumber, !password) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    }


    //check if user already exists 
    User.findOne({ email })
        .then((user) => {
            if (user) {
                res.status(422).send("user already exist");
            } else {
                console.log(req.body)

                let newUser = new User({ userName, email, password, phoneNumber })

                newUser.save()
                    .then(() => {
                        console.log("data saved")
                        res.send('signup success')
                    })
                    .catch(err => console.log(err))
            }
        })

})



//Login Route
router.route('/login').post((async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)

        if (!email, !password) {
            res.status(403).send("required field missing");
            return;
        }
        const user = await User.findOne({ email:email });
        if (!user) {
            res.send("User not Found")

        }
        else {
            console.log({
                userName: user.name,
                email: user.email,
                _id: user._id,
            });

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                console.log("Invalid Credentials")
                res.send("Invalid Credentials")
            }
            else {
                console.log("user loggined successfully")
                res.send({
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                });
            }
        }

    }
    catch (err) {
        res.send("Error in Login")
    }
}))



//route to get user data used in about contact and home page
router.get('/getData', Authenticate, (req, res) => {
    res.send(req.rootUser);
    // rootuser contains the whole document (data) of the user we get it from the token (in middleware/authentication)

})


//contact route to send message
router.post('/rashanform', async (req, res) => {

    try {
        console.log("req.body", req.body)
        const currentStatus = "Pending"
        const { name, fatherName, email, phoneNumber, CNIC, rashan, familyMembers, income, dateOfBirth } = req.body;

        // if (!name || !fatherName || !email || !phoneNumber || !CNIC || !rashan || !currentStatus|| familyMembers || income || dateOfBirth) {
        //     res.status(403).send("required field missing");
        //     return;
        // }

        let newRashanRequest = new RashanRequest({ name, fatherName, email, phoneNumber, CNIC, rashan, currentStatus, familyMembers,  income, dateOfBirth})

        newRashanRequest.save()
            .then(() => {
                console.log("data saved")
                res.send('request submitted successfully')
            })
            .catch(err => console.log(err))



    } catch (err) {
        console.log(err)
    }
})



//logout
router.get('/logout', (req, res) => {
    res.clearCookie('token', { path: "/" })


    //another method to clear cookie
    // res.cookie("token", "" , {
    //     httpOnly: true,
    // });


    res.send("user logout")
})

module.exports = router