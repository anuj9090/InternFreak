const express=require("express");
const router=express.Router();
const path = require("path");
const md5 = require('md5');
const User=require('./../models/userAuthentication')
const app=express();
router.get('/registration',(req,res)=>{
    res.render('articles/registration');
})
router.post('/registration',(req,res)=>{
    console.log(req.body);
    let user=new User({
       email:req.body.email,
       name:req.body.name,
       password:md5(req.body.password)
    })
    user.save(function(err){
        if(err)
        console.log(err);
        else
        {
            // console.log(user);
         res.render("articles/login")
        }
    });
})
router.get('/login',(req,res)=>{
    res.render('articles/login');
})
router.post('/login',(req,res)=>{
    console.log(req.body);
    const email=req.body.email;
    console.log(email);
    const password=md5(req.body.password);
    console.log(password)
    User.findOne({email:email },function(err,foundUser){
        if(err) {
            console.log(err);
        }
        else
        {
            // console.log(foundUser)
            if(foundUser)
            {
                if(foundUser.password === password)
                {
                  res.render("articles/registration")
                }
            }
        }
    })
})

module.exports=router;