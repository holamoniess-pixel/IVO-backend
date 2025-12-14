
const r=require("express").Router();
const U=require("../models/User");
r.get("/me",async(_,res)=>res.json(await U.findOne()));
r.patch("/",async(req,res)=>res.json(await U.findOneAndUpdate({},req.body,{new:true})));
module.exports=r;
