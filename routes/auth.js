
const r=require("express").Router();
const U=require("../models/User");
const b=require("bcryptjs");
const j=require("jsonwebtoken");

r.post("/signup",async(req,res)=>{
 const u=await U.create({...req.body,password:await b.hash(req.body.password,10)});
 res.json({token:j.sign({id:u._id},process.env.JWT_SECRET)});
});

r.post("/login",async(req,res)=>{
 const u=await U.findOne({email:req.body.email});
 if(!u||!await b.compare(req.body.password,u.password))
  return res.status(400).json({message:"Invalid credentials"});
 res.json({token:j.sign({id:u._id},process.env.JWT_SECRET)});
});

module.exports=r;
