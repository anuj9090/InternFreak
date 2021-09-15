const express = require("express");
const dotenv = require("dotenv");
const app = express();
const articleRouter=require('./routes/index')
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const path = require("path");
const Article=require('./models/article')
const Blog=require('./routes/blog')
const user=require('./routes/user')
const udemy=require('./routes/udemy')
// const expressLayouts=require('express-ejs-layouts')
// Static Folder
app.use(express.static(path.join(__dirname,"public")));
// mongoose
const connectDB =require('./config/db')
dotenv.config({ path: "./config/config.env" });
connectDB()
// ejs
app.set("view engine", "ejs");
app.set('views',__dirname+'/views')
// app.set('layout','layouts/layout')
app.use(express.urlencoded({ extended: false }))
// app.use(expressLayouts)
app.use(express.static("public"));
// Routes
app.get('/',async (req,res)=>{
  const articles=await Article.find().sort({
      createdAt:'desc'
  })
          res.render('articles/inde',{articles:articles});     
})
app.get('/privacy-policy',(req,res)=>{
  res.render("articles/privacy-policy")
})
app.get('/sitemap.xml',(req,res)=>{
  res.sendFile(__dirname + '/views/articles/sitemap.xml')
})
app.get('/dmca',(req,res)=>{
  res.render("articles/dmca")
})
app.get('/terms-and-conditions',(req,res)=>{
  res.render("articles/term-condition")
})
app.get('/robots.txt',(req,res)=>{
  res.sendFile(__dirname + '/views/articles/robots.txt')
})
app.get('/ads.txt',(req,res)=>{
  res.sendFile(__dirname + '/views/articles/ads.txt')
})
app.get('/privacy-policy',(req,res)=>{
  res.render("articles/privacy-policy")
})
app.get('/404-error',(req,res)=>{
  res.render("articles/404")
})
app.use('/jobs-and-internships',articleRouter)
// app.use('/user',user);
// app.use('/blog',Blog);
// app.use('/udemy',udemy)
// app.use('/',articleRouter)
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
