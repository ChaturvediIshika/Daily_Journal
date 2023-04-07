const express=require('express');
const passport = require('passport');
const router=express.Router();
const User=require('../model/user');

router.get('/signup',(req,res)=>{
    res.render('Auth/signup');
})

router.get('/login',(req,res)=>{
    res.render('Auth/login');
})

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/journal');
})

router.post('/signup',async(req,res)=>{
    try{
        const {username,password,email}=req.body;
        const user=await new User({username,email});
        User.register(user,password);
        req.flash('msg','Account Created Successfully');
        res.redirect('/login');
    }
    catch(err){
        req.flash('err',err.message);
        res.redirect('/signup');
    }
})



module.exports=router;