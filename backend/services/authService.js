const jwt = require('jsonwebtoken');

const generateToken = (user)=>{
    const payloadForJWT = {
        id: user.id,
        email: user.email,
        role:user.role
    }
    const token = jwt.sign(payloadForJWT,process.env.JWT_SECRET,{expiresIn:'1d'});
    return token
}

module.exports = {
    generateToken
}