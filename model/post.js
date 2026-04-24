const mongoose=require('mongoose');
const {ObjectId} = mongoose.Schema;
const User=require('./user');

const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    createBy:{
        type:ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true});
const Post=mongoose.model('Post',postSchema);
module.exports=Post;