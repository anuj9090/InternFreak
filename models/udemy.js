const mongoose=require("mongoose")
const slugify=require('slugify')
const udemy=new mongoose.Schema({
    title:{
        type:String
    },
    category:{
        type:String
    },
    slug:{
        type:String,
        required:true,
        unique:true
      },
      createdAt:{
    type:Date,
    default:Date.now()
  },
})
udemy.pre('validate',function(next){
    if(this.title)
    {
      this.slug=slugify(this.title,{
        lower:true,
        strict:true
      })
    }
    next()
  })
module.exports=mongoose.model('udemy',udemy);