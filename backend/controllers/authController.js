const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

//generate jwt token
const generateToken=()=> {
    return jwt.sign({id:userId},process.env.JWT_SECRET,{
        expiresIn:"30d",
    });
}

const registerUser=async(req,res)=> {
    try {
        const {name,email,password,profileImageUrl}=req.body;
        const userExits=await User.findOne({email});
        if(userExits) {
            return res.status(400).json({message:"User already exists"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);
        const user=await User.create({
            name,
            email,
            password:hashPassword,
            profileImageUrl,
        });

        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            profileImageUrl:user.profileImageUrl,
            token:generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
};


const loginUser=async(req,res)=> {

}

const getUserProfile=async(req,res)=> {

}

module.exports={registerUser,loginUser,getUserProfile};