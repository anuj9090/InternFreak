const express=require("express");
const router=express.Router();
const path = require("path");
const Blog=require('./../models/blog')
router.get('/new',(req,res)=>{
    res.render('articles/newBlog')
})
router.post('/',async(req,res)=>{
    let blog =new Blog({
        title: req.body.title,
        description: req.body.description
    })
    try{
        console.log(blog);
        blog=await blog.save();
        res.redirect(`/blog/${blog.slug}`);
    }
    catch(e){
        console.log(e);
        res.render('articles/newBlog',{blog:blog})
    }
})
router.get('/:slug',async (req,res)=>{
    try{
    const blog=await Blog.findOne({slug:req.params.slug})
    if(blog==null)
    res.redirect('/')
    // const blogs=await Blog.find().sort({
    //     createdAt:'desc'
    // })
    res.render('articles/blog',{blog:blog})
    }
    catch(e){
        console.log(e);
    }
})
module.exports=router;