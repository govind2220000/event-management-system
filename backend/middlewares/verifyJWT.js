const jwt = require("jsonwebtoken");
const ERR = require("../utils/errorConstants");


function verifyJWT(req,res,next){
    const token = req.headers?.authorization?.split(" ")[1];
    if(!token){
        const error = new Error(ERR.UNAUTHORIZED.message);
        error.status = ERR.UNAUTHORIZED.status;
        throw error;
    }
    try {
        
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    //console.log(req.user);
    next();
    } catch (error) {
        error.status = ERR.INVALID_TOKEN.status;
        error.message = ERR.INVALID_TOKEN.message;
      next(error);
    
}}


module.exports = verifyJWT;