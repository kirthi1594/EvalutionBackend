const Router = require("express").Router
require("dotenv").config()
const {PostModel} = require("../models/post.model")
const postRouter = Router()

postRouter.get("/", async(req,res)=>{
 try {
    const post = await PostModel.find()
    res.send({"msg":"posts",post})
 } catch (error) {
    res.send({"msg":error})
 }
})

postRouter.post("/add", async(req,res)=>{
    try {
        const {title,body,device} = req.body
        const newpost = new PostModel({title,body,device})
        await newpost.save()
       res.send({"msg":"post created",newpost})
    } catch (error) {
        res.send({"msg":error})
    }
   })


   postRouter.patch("/update/:postId", async(req,res)=>{
      try {
          const {postId} = req.params
          const userWantUpdate = req.body.userId
          const post = await PostModel.findById(postId)
          
          const userIdCreater = post.userId
          if(userWantUpdate === userIdCreater){
            await PostModel.findByIdAndUpdate(postId)
         res.send({"msg":"post updatedted"})
      } else{
         throw new Error("not authorised to update")
      }}
      
      catch (error) {
          res.send({"msg":error})
      }
     })



     postRouter.delete("/delete/:postId", async(req,res)=>{
      try {
          const {postId} = req.params
          const userWantDelete = req.body.userId
          const post = await PostModel.findById(postId)
          
          const userIdCreater = post.userId
          if(userWantDelete === userIdCreater){
            await PostModel.findByIdAndDelete(postId)
         res.send({"msg":"post deleted"})
      } else{
         throw new Error("not authorised to delete")
      }}
      
      catch (error) {
          res.send({"msg":error})
      }
     })


module.exports = {postRouter}