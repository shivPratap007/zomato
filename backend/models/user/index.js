const mongoose=require('mongoose');

const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken');
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

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(this.password,salt);
        this.password=hashedPassword;
        next();
    }catch(error){
        return next(error);
    }
})

userSchema.methods.generateJwtTokens=function(){
    return jwt.sign({
        data:this._id,
    },process.env.SECRET_KEY);
}

const Users=mongoose.model("Users",userSchema);
module.exports={Users};