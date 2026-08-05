const User = require("../../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const login = async (req, res) => {
    const logindetails = req.body;

    if (!logindetails) {
        return res.status(400).json({
            message:"No Login data received"});
    }

    const user = await User.findOne({
        email: logindetails.email,
    });

    if (!user) {
        return res.status(401).json({
            message:"Invalid email or password"})
    }
    const isValid=await bcrypt.compare( logindetails.password,user.password);
    if (!isValid) {
        return res.status(401).json({
            message:"Invalid email or password"});
    }
    const token=jwt.sign({id:user._id,email:user.email},process.env.ACCESS_TOKEN_SECRET);
    const username= await User.findById(user._id);
   
    return res.status(200).json({
        message: "Login successfully",
        id:user._id,
        email: user.email,
        name:username.firstname,
        token:token
    });
};

module.exports = login;