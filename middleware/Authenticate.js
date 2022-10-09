const jwt = require("jsonwebtoken");
const Admin = require("../models/adminSchema")

const Authenticate = async (req, res, next) => {
    try {

        //we can get token from request or cookies 
        // another way of getting token is used in (The-MERNStack-Project)
        const token = req.cookies.token;

        //Verifying token with secret key
        const verifyToken = jwt.verify(token, process.env.SECRET);
        // console.log(verifyToken)

        //after verification of token we match id of admin (from token) and searching it in database
        //if admin found we save all he details of admin in a rootAdmin var
        const rootAdmin = await Admin.findOne({ _id: verifyToken._id, "tokens.token": token });
        // console.log("rootAdmin: ", rootAdmin)
        
        
        if (!rootAdmin) { throw new Error("Admin Not Found") };
        
        //saving token in var
        req.token = token;


        //if admin found we are getting all the details of the admin
        req.rootAdmin = rootAdmin
        req.adminID = rootAdmin._id;

        //to process further otherwise we will stuck here
        next();

    } catch (err) {
        res.status(401).send("Unauthorized:No token provided");
        console.log(err)
    }


}
module.exports = Authenticate;