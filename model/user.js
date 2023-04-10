const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    email:String,
    isAdmin:Boolean,
    saved:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Journal'
    }]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);