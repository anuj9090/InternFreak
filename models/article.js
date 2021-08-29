const mongoose =require('mongoose');
const slugify=require('slugify')
const blogSchema=new mongoose.Schema({
  companyDetails:{
    type:String 
  },
  heading:{
    type:String
  },
   designation:{
    type:String
   },
   qualification:{
    type:String
   },
   ctcOrStipend:{
    type:String
   },
   ctc:{
     type:String
     
   },
   location:{
    type:String
   },
  title:{
      type:String
      
  },
  category:{
    type:String
    
  },
  description:{
    type:String
    
  },
  applyLink:{
    type:String
   },
   candidateShouldHave:{ 
     type:String
   },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  slug:{
    type:String,
    required:true,
    unique:true
  },
  image:  { 
   type:String , 
   required:true
  },
  khaliDabbaHeading:{ 
    type:String , 
    required:true
   },
   khaliDabbaDescription:  { 
    type:String , 
    required:true
   },
   candidateShouldDescription1:  { 
    type:String , 
    required:true
   },
   candidateShouldDescription2:  { 
    type:String , 
    required:true
   },
   candidateShouldDescription3:  { 
    type:String , 
    required:true
   },
   candidateShouldDescription4:  { 
    type:String , 
    required:true
   },
   candidateShouldDescription5:  { 
    type:String , 
    required:true
   }
})
blogSchema.pre('validate',function(next){
  if(this.title)
  {
    this.slug=slugify(this.title,{
      lower:true,
      strict:true
    })
  }
  next()
})
const blog =mongoose.model('blog',blogSchema)
module.exports=blog