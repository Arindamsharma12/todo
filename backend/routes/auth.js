const router = require('express').Router();
const User = require('../models/user.js')
const bcrypt = require('bcryptjs');
// Sign Up
router.post('/register',async (req,res)=>{
  try{
    const {email,password,username} = req.body
    const hashPassword = bcrypt.hashSync(password);
    const user = new User({email,username,password:hashPassword})
    await user.save().then(()=>res.status(200).json({message:"User Sign Up Successfully"})
    )
  }
  catch(error){
    res.status(400).json({message:"User Already Exists"})
    // console.log('User already exists',error);
  }
})

// Sign In
router.post('/signin',async (req,res)=>{
  try{
    const user = await User.findOne({email:req.body.email})
    if(!user){
      res.status(200).json({message:"Please Sign Up first"})
    }
    
    const isPasswordValid = bcrypt.compareSync(req.body.password,user.password)
    if(!isPasswordValid){
      res.status(200).json({message:"Password is not correct"})
    }

    const {password,...others} = user._doc;
    res.status(200).json({others})
  }
  catch(error){
    res.status(200).json({message:"User Already Exists"})
  }
})

module.exports = router;
