const mongoose=require("mongoose")
const userAuthentication=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    role:{
      type:String,
      default:"basic",
      enum: ["basic","admin"],
    }
})
module.exports=mongoose.model('user',userAuthentication);