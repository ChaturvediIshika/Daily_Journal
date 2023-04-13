const express=require('express');
const router=express.Router();
const User=require('../model/user');
const Journal=require('../model/journalModel');

router.get('/profile/:id',async(req,res)=>{
    const {id}=req.params;
    const profile=await User.findById(id);
    const posts=await Journal.find({'creator':id}).populate('creator');
    res.render('user/profile',{profile,posts});
})

router.get('/profile/edit/:username',(req,res)=>{
    const data=req.user;
    res.render('user/editProfile',{data});
})

router.post('/profile/edit/:username',async(req,res)=>{
    const {name,email,image,bio,Address}=req.body;
    // console.log({name,email,image,bio,Address});
    await User.findByIdAndUpdate(req.user.id,{name,email,image,bio,Address});
    res.redirect('/profile/'+req.user.username);
})

module.exports=router;