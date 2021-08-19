const express=require("express");
const router=express.Router();
const Article=require('./../models/article')
const path = require("path");
const app=express();
const multer = require('multer');
const fs = require('fs');
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static( __dirname + "/public"));
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null,'public/uploads');
    },
    filename: function(req, file, cb) {
        cb(null,file.originalname);
      }
  });
var upload=multer({
    storage:storage,
})
app.use(express.static(path.join(__dirname,"public")));
router.get('/',async (req,res)=>{
    const articles=await Article.find().sort({
        createdAt:'desc'
    })
            res.render('articles/inde',{articles:articles});
        
})

router.get('/new',(req,res)=>{
    res.render('articles/new',{article:new Article()})
})
router.post('/',upload.single("image"),async (req,res)=>{
   let article = new Article({
    //    console.log(req.body)
       title: req.body.title,
       category: req.body.category,
       description: req.body.description,
       companyDetails:req.body.companyDetails,
       heading:req.body.heading,
       designation:req.body.designation,
       qualification:req.body.qualification,
       ctc:req.body.ctc,
       location:req.body.location,
       applyLink:req.body.applyLink,
       candidateShouldHave:req.body.candidateShouldHave,
       image:req.file.filename
   })
   
   try{
       console.log(article);
 article= await article.save();
 res.redirect(`/articles/${article.slug}`)
   }
   catch(e){
       console.log(e);
    res.render('articles/new',{article:article})
   }
})
router.get('/:slug',async (req,res)=>{
    try{
    const article=await Article.findOne({slug:req.params.slug})
    if(article==null)
    res.redirect('/')
    const articles=await Article.find().sort({
        createdAt:'desc'
    })
    res.render('articles/newpost',{articles:articles,article:article})
    }
    catch(e){
        console.log(e);
    }
})
module.exports=router;