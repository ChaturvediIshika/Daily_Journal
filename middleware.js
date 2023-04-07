module.exports.locals=(req,res,next)=>{
    res.locals.user=req.user;
    res.locals.msg=req.flash('msg');
    res.locals.err=req.flash('err');
    next();
}