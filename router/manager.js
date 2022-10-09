const express = require("express");
const router = express.Router();

router.route("/").get(async (req, res) => {
    res.send("Hello world Router")
})


//Login Route
router.route('/login').post((async (req, res) => {
    managerEmail = "manager@gmail.com"
    managerPassword = "manager12345678"
    
    try {
        const { email, password } = req.body;
        if (!email, !password) {
            res.status(403).send("required field missing");
            return;
        }

        if (email == managerEmail && password == managerPassword) {
            res.send({
                email: managerEmail,
                password: managerPassword
            })
        }
    }
    catch (err) {
        res.send("Error in Login")
    }
}))

module.exports = router