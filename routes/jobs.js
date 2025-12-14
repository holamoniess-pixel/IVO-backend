
const r=require("express").Router();
const J=require("../models/Job");
r.get("/",async(_,res)=>res.json(await J.find()));
r.post("/",async(req,res)=>res.json(await J.create(req.body)));
module.exports=r;
