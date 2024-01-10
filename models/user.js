const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    phoneNo:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    profileImg:{
        type:String
    },

    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['User','Admin'],
        default:'User'
    }
},{timestamps:true});


module.exports= mongoose.model("User",userSchema);