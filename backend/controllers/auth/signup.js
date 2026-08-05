const User = require("../../models/User");
const bcrypt=require("bcrypt");
const signup=async (req, res) => {
  const signupdetails = req.body;

  if (!signupdetails) {
    return res.status(400).send("No data received");
  }
  const existingUser = await User.findOne({
    email: signupdetails.email
   });

if (existingUser) {
    return res.status(409).json({
        message:"Email already exists"});
}
  if (
    !/^[A-Za-z]{2,}$/.test(signupdetails.firstname) ||
    !/^[A-Za-z]{2,}$/.test(signupdetails.lastname)
) {
    return res.status(400).json({
        message:"Invalid name"});

}if (
    !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(signupdetails.email)
) {
    return res.status(400).json({message:"Invalid Email"});
}if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/.test(signupdetails.password)
) {
    return res.status(400).json({message:"Weak password"});
}
const password=await bcrypt.hash(signupdetails.password,10);
const newuser={
    firstname:signupdetails.firstname,
    lastname:signupdetails.lastname,
    email:signupdetails.email,
    password: password
}
  const user=new User(newuser);
  await user.save();


  res.status(201).json({
    message: "User registered successfully",
    email: user.email
});
}
module.exports=signup;