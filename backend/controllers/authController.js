const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

//generate jwt token
const generateToken=(userId)=> {
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
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user) {
            return res.status(400).json({message:"Invalid email"});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) {
            return res.status(400).json({message:"Invalid password"});
        }

        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            profileImageUrl:user.profileImageUrl,
            token:generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
}

const getUserProfile=async(req,res)=> {
    try {
        const user=await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
}

module.exports={registerUser,loginUser,getUserProfile};