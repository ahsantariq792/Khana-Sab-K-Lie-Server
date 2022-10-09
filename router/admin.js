const express = require("express");
const router = express.Router();
const RashanRequest = require("../models/rashanSchema")

router.route("/").get(async (req, res) => {
    res.send("Hello world Router")
})


//Login Route
router.route('/login').post((async (req, res) => {
    adminEmail = "admin@gmail.com"
    adminPassword = "admin12345678"

    try {
        const { email, password } = req.body;
        if (!email, !password) {
            res.status(403).send("required field missing");
            return;
        }

        if (email == adminEmail && password == adminPassword) {
            res.send({
                email: adminEmail,
                password: adminPassword
            })
        }
    }
    catch (err) {
        res.send("Error in Login")
    }
}))

router.route('/request').get((async (req, res) => {
    console.log("api hit");
    RashanRequest.find()
        .then(admdata => res.json(admdata))
        .catch(err => res.status(400).json('Error: ' + err));
}));

module.exports = router