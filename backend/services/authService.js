const jwt = require('jsonwebtoken');

const generateToken = (user)=>{
    const payloadForJWT = {
        id: user.id,
        email: user.email,
        role:user.role
    }

    return jwt.sign(payloadForJWT,process.env.JWT_SECRET,{expiresIn:'1h'});
}

module.exports = {
    generateToken
}