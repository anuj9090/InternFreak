const express=require("express");
const router=express.Router();
const Article=require('./../models/article')
const path = require("path");
const app=express();
const multer = require('multer');
const {authUser,authRole}=require('../controllers/userAuth')
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
router.get('/posts/@nuj',(req,res)=>{
    res.render('articles/new',{article:new Article()})
})
router.get('/',async (req,res)=>{
    const page=parseInt(req.query.page);
   const limit=parseInt(req.query.limit);
    const startIndex=(page-1)*limit;
    const endIndex=page*limit;
//     const results={}
    const articles=await Article.find().sort({
        createdAt:'desc'
    })
//     results.next={
//         page:page+1,
//         limit:limit
//     }
//     results.previous={
//         page:page-1,
//         limit:limit
// }
 const resultUsers=articles.slice(startIndex,endIndex);
            res.render('articles/jobs',{articles:resultUsers});     
})

router.post('/',upload.single("image"),async (req,res)=>{
   let article = new Article({
       title: req.body.title,
       category: req.body.category,
       description: req.body.description,
       companyDetails:req.body.companyDetails,
       heading:req.body.heading,
       designation:req.body.designation,
       qualification:req.body.qualification,
       ctcOrStipend:req.body.ctcOrStipend,
       ctc:req.body.ctc,
       khaliDabbaHeading:req.body.khaliDabbaHeading,
       khaliDabbaDescription:req.body.khaliDabbaDescription,
       candidateShouldDescription1:req.body.candidateShouldDescription1,
       candidateShouldDescription2:req.body.candidateShouldDescription2,
       candidateShouldDescription3:req.body.candidateShouldDescription3,
       candidateShouldDescription4:req.body.candidateShouldDescription4,
       candidateShouldDescription5:req.body.candidateShouldDescription5,
       location:req.body.location,
       applyLink:req.body.applyLink,
       candidateShouldHave:req.body.candidateShouldHave,
       image:req.file.filename
   })
   
   try{
       console.log(article);
 article= await article.save();
 res.redirect(`/jobs-and-internship-opportunities/${article.slug}`)
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
