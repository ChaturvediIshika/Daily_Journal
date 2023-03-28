const mongoose=require('mongoose');

const jSchema=new mongoose.Schema({
    postTitle:{
        type:String,
        required:true
    },
    pp:{
        type:String,
        required:true
    }
});

const Journal=mongoose.model("Journal",jSchema);
module.exports=Journal;