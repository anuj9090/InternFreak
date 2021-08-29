const express=require("express");
const router=express.Router();
const path = require("path");
const Blog=require('./../models/blog')
router.get('/new',(req,res)=>{
    res.render('articles/newBlog')
})
router.get('/:slug',async (req,res)=>{
    try{
    const blog=await Blog.findOne({slug:req.params.slug})
    if(blog==null)
    res.redirect('/')
    const blogs=await Blog.find().sort({
        createdAt:'desc'
    })
    res.render('articles/newBlog',{blogs:blog})
    }
    catch(e){
        console.log(e);
    }
})
module.exports=router;