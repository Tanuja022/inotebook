const express=require('express');
const router=express.Router();
const User =require('../modules/User');
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser=require('../Middware/fetchuser');

const JWT_SECRET="Hello GOOd";
// Route1
//creating post :api/auth/createuser 
router.post('/createuser',[
   body('name').isLength({min:3}),
   body('email').isEmail(),
   body('password').isLength({min:5}),
],async(req,res)=>{
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check wheather user email already exist 
    try{
    
    let user=await User.findOne({email:req.body.email});
    // console.log(user);
    if(user){
      return res.status(404).json({error:"sorry a user with email already exist"});
    }
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    //create new user
     user=await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    
   res.json({authtoken})
  }catch(error){
    console.error(error.msg);
    res.status(500).send("Some error occurs")
  }

 
})
//user login Route2
 //creating post :api/auth/login
 router.post('/login',[
  body('email','enter valid email').isEmail(),
  body('password','Password cannot be blank').exists(),
],async(req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const{email,password}=req.body;
  try {
    let user=await User.findOne({email});
    if(!user){
      return res.status(400).json({ errors: "please try to login with correct credentials" });
    }
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      
      return res.status(400).json({errors: "please try to login with correct credentials" });
    }

    const data={
      user:{
        id:user.id
      }
    }
    const authtoken= jwt.sign(data,JWT_SECRET);
    success=true;
   res.json({authtoken})

  } catch (error) {
    console.error(error.msg);
    res.status(500).send("Internal server error")
  }

})

//Route 3
//creating post :api/auth/getuser
router.post('/getuser',fetchuser,async(req,res)=>{

try {
  userid=req.user.id;
  const user= await User.findById(userid).select("-password")
  res.send(user);
} catch (error) {
  console.error(error.msg);
  res.status(500).send("Internal server error")
}
})
module.exports=router