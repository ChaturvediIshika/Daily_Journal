const express=require('express');
const app=express();
const path=require('path');
const router=require('./routes/routes');
const engine=require('ejs-mate');
const mongoose=require('mongoose');
const Journal=require('./model/journalModel')
const methodOverride=require('method-override');

app.engine('ejs',engine);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://127.0.0.1:27017/DailyJournal').then(()=>{
    console.log("db connected");
}).catch(()=>{
    console.log(err);
});

app.use(router);

app.get('/',(req,res)=>{
    res.redirect('/journal');
})


app.listen(3000,()=>{
    console.log("Server Connected");
})