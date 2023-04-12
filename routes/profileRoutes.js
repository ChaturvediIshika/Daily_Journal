const express=require('express');
const router=express.Router();
const User=require('../model/user');

router.get('/profile/:username',async(req,res)=>{
    const {username}=req.params;
    console.log(req.params);
    const profile=await User.find({username});
    res.render('user/profile',{profile});
})

module.exports=router;