const Router = require("express").Router
const bcrypt = require("bcrypt")
const {UserModel} = require("../models/auth.model")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const {blacklist} = require("../blacklist")

const authRouter = Router()

authRouter.post("/register",async(req,res)=>{
    try {
        const {name, password, email, gender} = req.body

        const isUserPresent = await UserModel.findOne({email})
        if(isUserPresent) throw new Error (`user with ${email} already exists`)

        bcrypt.hash(password,5,async function(err,hash){
            if(err){
                res.status(400).send("something went wrong while hashing")
            }
            else{
                const newUser = new UserModel({name, password:hash, email, gender })
                await newUser.save()
        
                res.status(200).send({msg:"new user added",user: newUser})  
            }})
        
        }catch (error) {
        res.send({msg:"error in registering",error:error.message})
    }
})

authRouter.post("/login",async(req,res)=>{
    try {
        const { password, email} = req.body
        const isUserPresent = await UserModel.findOne({email})
        
        if(!isUserPresent) throw new Error (`user with ${email} doesn't exists`)
        
        bcrypt.compare(password,isUserPresent.password,async function(err,result){
        
          
        if(result){
            const token = jwt.sign({userId:isUserPresent._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
            console.log(token)
            const refreshToken = jwt.sign({username:isUserPresent.username},process.env.JWT_REFRESH_KEY,{expiresIn:'10d'})
            console.log(refreshToken)
            res.cookie("social-access-token",token)
            res.cookie("refreshToken",refreshToken)
            res.status(200).send({msg:"user loggedin ",username:isUserPresent.username})
        }
        else{
           res.status(400).send("password is invalid",err)
        }
        })

    } catch (error) {
        res.send({msg:"error",error:error.message})
    }
})

authRouter.get("/logout",(req,res)=>{
    const accessToken = req.cookies["social-access-token"]
    try {
       blacklist.push(accessToken) 
       res.send({"msg":"logout success"})
    } catch (error) {
        res.send({"msg":error.message})
    }
})

module.exports ={authRouter}