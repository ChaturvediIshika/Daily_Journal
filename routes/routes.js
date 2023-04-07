const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const { isLoggedIn } = require('../middleware');
const Journal=require('../model/journalModel')

const home="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
// posts.push({postTitle:"home",pp:home});

router.get('/journal',async(req,res)=>{
    const posts=await Journal.find({});
    res.render('journal/index',{posts});
})

router.get('/journal/about',(req,res)=>{
    res.render('journal/about',{home});
})

router.get('/journal/contact',(req,res)=>{
    res.render('journal/contact',{home});
})

router.get('/journal/compose',isLoggedIn,(req,res)=>{
    res.render('journal/compose');
})

router.post('/journal/compose',isLoggedIn,async(req,res)=>{
    const {postTitle,pp}=req.body;
    await Journal.create({postTitle,pp});
    req.flash('msg','Journal Added Successfully');
    res.redirect('/journal');
})

router.get('/journal/show/:id',isLoggedIn,async(req,res)=>{
    try{
    const {id}=req.params;
    const post=await Journal.findById(id);
    res.render('journal/readMore',{post});
    }
    catch(err){
        res.send(err);
    }
})

router.get('/journal/edit/:id',isLoggedIn,async(req,res)=>{
    const {id}=req.params;
    const post=await Journal.findById(id);
    res.render('journal/edit',{post});
})

router.post('/journal/edit/:id',isLoggedIn,async(req,res)=>{
    const {id}=req.params;
    const {postTitle,pp}=req.body;
    await Journal.findByIdAndUpdate(id,{postTitle,pp});
    req.flash('msg','update successful');
    res.redirect(`/journal/show/${id}`);
})

router.delete('/journal/:id',isLoggedIn,async(req,res)=>{
    const {id}=req.params;
    await Journal.findByIdAndDelete(id);
    req.flash('err','deleted successfully');
    res.redirect('/journal');
})

module.exports=router;