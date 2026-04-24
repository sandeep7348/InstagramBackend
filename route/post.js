const express=require('express');
const router=express.Router();

const Post=require('../model/post');

const jsonwebtoken=require('jsonwebtoken');

router.post('/create',(req,res,next)=>{
    const token=req.headers?.authorization;
    if(!token)
    {
        return res.status(401).json({message:'Unauthorized'});
    }
    const value=token.split(' ')[1];
    const user=jsonwebtoken.verify(value,"I Love Cupcakes");
    

    if(!user)
    {
        return res.status(401).json({message:'Unauthorized'});
    }
    req.user=user;
    next();
},async(req,res)=>{

    const {caption,imageUrl}=req.body;
    const post=new Post({
        caption,
        imageUrl,
        createBy:req.user.userId,
        createdAt:Date.now()
    })
    const savedPost=await post.save();
    res.status(201).json({message:'Post created successfully',post:savedPost});
})

module.exports=router;