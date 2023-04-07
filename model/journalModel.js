const mongoose=require('mongoose');

const jSchema=new mongoose.Schema({
    postTitle:{
        type:String,
        required:true
    },
    pp:{
        type:String,
        required:true
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

const Journal=mongoose.model("Journal",jSchema);
module.exports=Journal;