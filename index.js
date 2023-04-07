const express=require('express');
const app=express();
const path=require('path');
const router=require('./routes/routes');
const engine=require('ejs-mate');
const mongoose=require('mongoose');
const Journal=require('./model/journalModel')
const methodOverride=require('method-override');
const session=require('express-session');
const flash=require('connect-flash');
const {locals}=require('./middleware');
const port=3000;

app.use(session({
  secret: 'Secret Daily Journal',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

app.engine('ejs',engine);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(flash());
app.use(locals);

dburl1="mongodb+srv://cishika104:doraemon1234@cluster0.zsj2ef2.mongodb.net/DailyJournal";
dburl2='mongodb://127.0.0.1:27017/DailyJournal';

mongoose.connect(dburl1).then(()=>{
    console.log("db connected");
}).catch(()=>{
    console.log(err);
});

app.use(router);

app.get('/',(req,res)=>{
    res.redirect('/journal');
})


app.listen(port,()=>{
    console.log("Server Connected ar port "+port);
})