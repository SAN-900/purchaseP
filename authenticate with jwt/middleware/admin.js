const { Admin } = require("../db");
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/jwt');
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const token = req.headers.authorization;
    const word = token.split(" ");
    const jwtToken = word[1];
    try{
    const verified = jwt.verify(jwtToken, JWT_SECRET);
    
    if(verified.username){
        next();
    }
    else {
            res.status(403).json({
                msg: "Admin doesnt authorized."
            })
        }
    }
    catch(e){
        res.json({
            msg: "incorrect input"
        })
    }

}
module.exports = adminMiddleware;