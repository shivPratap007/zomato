const {Food}=require('../../models/allModels');

const express=require('express');

const Router=express.Router();

Router.get('/r/:_id', async (req,res)=>{
    try{
        const {_id}=req.params;
        const foods=await Food.find({restaurant:_id});

        return res.status(200).json({
            foods
        })
    }catch(error){
        return res.status(400).json({
            error:error.message,
        })
    }
})

Router.get('/c/:category', async (req,res)=>{
    try{
        const {category}=req.params;

        const foods=await Food.find({
            category:{$regex:category,$options:"i"}
        })

        if(!foods) res.status(400).json({error:"No data matched"});

        return res.json({foods});
    }catch(error){
        return res.status(400).json({
            error:error.message,
        })
    }
})


module.exports=Router