const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    address:[{
        detail:{type:String},
        for:{type:String},
    }],
    phoneNumber:{
        type:Number,
    }
},{timestamps:true});

const Users=mongoose.model("Users",userSchema);
module.exports={Users};