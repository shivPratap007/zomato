const express=require('express');

const Router=express.Router();

const validator = require("email-validator");

const {Users}=require('../../models/allModels')

//  - Router  => /signup
//  - Des     => Register new user
//  - Params  => none
//  - Access  => Public

Router.post('/signup',async (req,res)=>{
    try{
        const {email,password,fullname,phoneNumber,adderss}=req.body.credentials;
        const checkUserByEmail=await Users.findOne({email});
        const checkUserByPhone=await Users.findOne({phoneNumber});

        // Checking whether the email or phoneno. is already present or not
        if(checkUserByEmail|| checkUserByPhone){
            return res.status(500).json({
                status:false,
                message:"User already exists",
            })
        }

        if(!validator.validate(email)){
            return res.status(500).json({
                status:false,
                message:"Email is not in proper format",
            })
        }
        
        // Entering into the DB
        const user=await Users.create({...req.body.credentials});

        const jwt= user.generateJwtTokens();

        res.status(200).json({
            jwt,
            status:true,
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({error:error.message});
    }
})

module.exports=Router;