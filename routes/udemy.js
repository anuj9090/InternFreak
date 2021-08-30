const express=require("express");
const router=express.Router();
const path = require("path");
const Udemy=require('./../models/udemy')
const axios = require("axios").default;
const clientID = "CXbUhKIQ5eOnP9QUxKKzkRbtRSsLslyMOS2VCCG6";
const clientSecret = "gK8EL2ixfREQtuTJRtFJ48TIc2PZUVjpleEKKdNX3PWKRVAAijA1HPxsi8tUSEeuoy86OiRPBjo5RDULAKAhdYzQFjIuLymaEkI48gxPjWb2LqnTPNtd15RzHGu4rzB5";
// Things required from Api
// 1.Title
// 2.heading
// 3.description
// 4.category
// 5.Author
// 6.Images
router.get('/new',(req,res)=>{
     res.render('articles/newUdemy')
});
router.get('/post',async(req,res)=>
{
  let udemy=new udemy({
    title:req.body.title
  })
  try{
    console.log(udemy);
const udemyCourse=await axios.get(
  `https://www.udemy.com/api-2.0/courses/${udemy.title}/?fields[course]=description,title,headline,_class,primary_category`,
  {headers:{
    "Accept": "application/json, text/plain, */*",
    "Authorization": "Basic Q1hiVWhLSVE1ZU9uUDlRVXhLS3prUmJ0UlNzTHNseU1PUzJWQ0NHNjpnSzhFTDJpeGZSRVF0dVRKUnRGSjQ4VEljMlBaVVZqcGxlRUtLZE5YM1BXS1JWQUFpakExSFB4c2k4dFVTRWV1b3k4Nk9pUlBCam81UkRVTEFLQWhkWXpRRmpJdUx5bWFFa0k0OGd4UGpXYjJMcW5UUE50ZDE1UnpIR3U0cnpCNQ==",
    "Content-Type": "application/json;charset=utf-8"
  },
})

// console.log(udemyCourse.data);
res.render("articles/udemy",{articles:udemyCourse.data})
  }
  catch(e){
    console.log(e);
  }
})
router.post("/",async(req,res)=>{
  let udemy =new Udemy({
    title:req.body.title
  })
  try{
    console.log(udemy);
    udemy=await udemy.save();
    res.render(`articles/${article.slug}`)
  }
  catch(e){
    console.log(e);
 res.render('articles/newUdemy',{udemy:udemy})
}
})
module.exports=router;