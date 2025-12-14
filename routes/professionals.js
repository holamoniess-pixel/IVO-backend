
const r=require("express").Router();
const U=require("../models/User");
r.get("/",async(req,res)=>{
 const q=req.query.search?{name:new RegExp(req.query.search,"i")}:{};
 res.json(await U.find(q));
});
module.exports=r;
