const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()


const auth=(req,res,next)=>{
    // const cookies = req.cookies
    //  const accessToken = cookies["social-access-token"]
     const accessToken = req.headers.authorization
    if(accessToken){
        jwt.verify(accessToken,process.env.JWT_SECRET_KEY,function(err,decoded){
            if(err){
                res.status(400).send("token is wrong or expired")
            }
            else{
                console.log(decoded)
                req.body.userId = decoded.userId
                    next()   
            }
        })}
         else{
            res.status(400).send({msg:"Please login again!"})
        }
    }


module.exports = {auth}