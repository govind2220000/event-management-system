const { user } = require("../config/db");
const { generateToken } = require("../services/authService");
const { hashPassword, comparePassword } = require("../utils/hash");
const ERR = require("../utils/errorConstants");


async function register(req,res,next){
    try {
        const{name,email,password,role} = req.body;
        if(!name || !email || !password){
            const error = new Error(ERR.INVALID_REQUEST.message);
            error.status = ERR.INVALID_REQUEST.status;
            throw error;
        }
        const exisitng = await user.findUnique({where:{email}});
        if(exisitng){
            const error = new Error(ERR.EMAIL_ALREADY_IN_USE.message);
            error.status = ERR.EMAIL_ALREADY_IN_USE.status;
            throw error;
        }
        const hashedPassword = await hashPassword(password);
        const newUser = await user.create({
            data:{
                name,
                email,
                passwordHash:hashedPassword,
                role
            }
        })
        res.status(201).json({message:"User registered successfully",user:{id:newUser.id,name,email,role}});
    } catch (error) {
        next(error);
    }
}


async function login(req,res,next){
    try {
        const{email,password} = req.body;
        const validUser = await user.findUnique({where:{email}});
        if(!validUser){
            const error = new Error(ERR.USER_NOT_FOUND.message);
            error.status = ERR.USER_NOT_FOUND.status;
            throw error;
        }
        
        const isPasswordValid = await comparePassword(password,validUser.passwordHash);
        if(!isPasswordValid){
            const error = new Error(ERR.INVALID_CREDENTIALS.message);
            error.status = ERR.INVALID_CREDENTIALS.status;
            throw error;
        }
        const token = generateToken(validUser)
        res.status(200).json({message:"Login successful",token,user:{id:validUser.id,name:validUser.name,email:validUser.email,role:validUser.role}});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login
}